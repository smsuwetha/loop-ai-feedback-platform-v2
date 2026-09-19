from pydantic import BaseModel, Field


class RecommendationRequest(BaseModel):
    feedbackSummary: str = Field(
        ...,
        min_length=1,
        max_length=50000,
    )


class RecommendationResponse(BaseModel):
    recommendation: str = Field(
        ...,
        min_length=1,
        max_length=1000,
    )

    rationale: str = Field(
        ...,
        min_length=1,
        max_length=2000,
    )

    priority: str = Field(
        ...,
        min_length=1,
        max_length=20,
    )