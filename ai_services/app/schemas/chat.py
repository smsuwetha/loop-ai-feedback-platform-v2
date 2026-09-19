from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(
        ...,
        min_length=1,
        max_length=5000,
    )

    context: str = Field(
        default="",
        max_length=50000,
    )


class ChatResponse(BaseModel):
    answer: str = Field(
        ...,
        min_length=1,
        max_length=10000,
    )