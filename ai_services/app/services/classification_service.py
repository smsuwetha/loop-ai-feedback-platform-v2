from groq import Groq

from app.schemas.classification import (
    ClassificationResponse,
)
from app.prompts.classification import (
    CLASSIFICATION_SYSTEM_PROMPT,
    build_classification_prompt,
)


# Maximum size of one piece sent to the AI.
MAX_FEEDBACK_CHARS = 12000


class ClassificationService:

    def __init__(self, client: Groq, model: str):
        self.client = client
        self.model = model

    def _split_feedback(
        self,
        feedback: str,
    ) -> list[str]:

        feedback = feedback.strip()

        if not feedback:
            return []

        return [
            feedback[i:i + MAX_FEEDBACK_CHARS]
            for i in range(
                0,
                len(feedback),
                MAX_FEEDBACK_CHARS,
            )
        ]

    def _classify_chunk(
        self,
        feedback: str,
    ) -> ClassificationResponse:

        response = self.client.chat.completions.create(
            model=self.model,
            temperature=0,
            response_format={
                "type": "json_object"
            },
            messages=[
                {
                    "role": "system",
                    "content": CLASSIFICATION_SYSTEM_PROMPT,
                },
                {
                    "role": "user",
                    "content": build_classification_prompt(
                        feedback
                    ),
                },
            ],
        )

        content = response.choices[0].message.content

        if not content:
            raise ValueError(
                "Groq returned an empty response."
            )

        return ClassificationResponse.model_validate_json(
            content
        )

    def classify(
        self,
        feedback: str,
    ) -> ClassificationResponse:

        feedback = feedback.strip()

        if not feedback:
            raise ValueError(
                "Feedback is required."
            )

        chunks = self._split_feedback(
            feedback
        )

        print(
            f"Feedback length: {len(feedback)} characters"
        )

        print(
            f"Number of chunks: {len(chunks)}"
        )

        # Normal case: feedback fits in one request.
        if len(chunks) == 1:
            return self._classify_chunk(
                chunks[0]
            )

        # Large feedback:
        # classify each chunk separately.
        results = []

        for index, chunk in enumerate(chunks):

            print(
                f"Processing chunk {index + 1}/{len(chunks)} "
                f"({len(chunk)} characters)"
            )

            result = self._classify_chunk(
                chunk
            )

            results.append(result)

        # Start with the first result.
        final_result = results[0]

        # Collect themes from every chunk.
        all_themes = []

        for result in results:
            all_themes.extend(
                result.themes
            )

        # Remove duplicate themes.
        unique_themes = {}

        for theme in all_themes:

            existing = unique_themes.get(
                theme.name
            )

            if (
                existing is None
                or theme.confidence
                > existing.confidence
            ):
                unique_themes[
                    theme.name
                ] = theme

        # Keep only the top 5 themes.
        final_result.themes = sorted(
            unique_themes.values(),
            key=lambda theme: theme.confidence,
            reverse=True,
        )[:5]

        return final_result