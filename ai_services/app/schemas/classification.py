from enum import Enum

from pydantic import BaseModel, Field


class Sentiment(str, Enum):
    POS = "POS"
    NEU = "NEU"
    NEG = "NEG"


class ThemeResult(BaseModel):
    name: str = Field(
        ...,
        min_length=1,
        max_length=120,
    )

    confidence: float = Field(
        ...,
        ge=0.0,
        le=1.0,
    )


class ClassificationRequest(BaseModel):
    feedback: str = Field(
        ...,
        min_length=1,
        max_length=50000,
    )


class ClassificationResponse(BaseModel):
    sentiment: Sentiment

    sentimentScore: float = Field(
        ...,
        ge=0.0,
        le=1.0,
    )

    featureArea: str = Field(
        ...,
        min_length=1,
        max_length=150,
    )

    rationale: str = Field(
        ...,
        min_length=1,
    )

    themes: list[ThemeResult] = Field(
        default_factory=list,
        max_length=5,
    )