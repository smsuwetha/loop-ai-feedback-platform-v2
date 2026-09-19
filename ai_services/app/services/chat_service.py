from groq import Groq

from app.prompts.chat import (
    CHAT_SYSTEM_PROMPT,
    build_chat_prompt,
)

from app.schemas.chat import ChatResponse


class ChatService:

    def __init__(
        self,
        client: Groq,
        model: str,
    ):
        self.client = client
        self.model = model

    def chat(
        self,
        message: str,
        context: str,
    ) -> ChatResponse:

        response = self.client.chat.completions.create(
            model=self.model,
            temperature=0.2,
            messages=[
                {
                    "role": "system",
                    "content": CHAT_SYSTEM_PROMPT,
                },
                {
                    "role": "user",
                    "content": build_chat_prompt(
                        message,
                        context,
                    ),
                },
            ],
        )

        content = response.choices[0].message.content

        if not content:
            raise ValueError(
                "Groq returned an empty response."
            )

        return ChatResponse(
            answer=content.strip()
        )