import os

from dotenv import load_dotenv
from groq import Groq

from app.services.classification_service import (
    ClassificationService,
)


load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise RuntimeError(
        "GROQ_API_KEY is missing."
    )

client = Groq(
    api_key=api_key.strip()
)

model = "llama-3.3-70b-versatile"

service = ClassificationService(
    client=client,
    model=model,
)


feedback = """
The new dashboard is extremely slow.
Pages take several seconds to load and
sometimes the application crashes.
The overall design looks good, but the
performance needs major improvement.
"""


result = service.classify(feedback)

print("\nLOOP AI CLASSIFICATION")
print("======================")

print(result.model_dump_json(indent=2))