from groq import Groq

from app.prompts.recommendation import (
    RECOMMENDATION_SYSTEM_PROMPT,
    build_recommendation_prompt,
)

from app.schemas.recommendation import (
    RecommendationResponse,
)


class RecommendationService:

    def __init__(
        self,
        client: Groq,
        model: str,
    ):
        self.client = client
        self.model = model

    def recommend(
        self,
        feedback_summary: str,
    ) -> RecommendationResponse:

        response = self.client.chat.completions.create(
            model=self.model,
            temperature=0,
            response_format={
                "type": "json_object"
            },
            messages=[
                {
                    "role": "system",
                    "content": RECOMMENDATION_SYSTEM_PROMPT,
                },
                {
                    "role": "user",
                    "content": build_recommendation_prompt(
                        feedback_summary
                    ),
                },
            ],
        )

        content = response.choices[0].message.content

        if not content:
            raise ValueError(
                "Groq returned an empty response."
            )

        return RecommendationResponse.model_validate_json(
            content
        )