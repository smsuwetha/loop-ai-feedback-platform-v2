from sentence_transformers import SentenceTransformer


class EmbeddingService:
    def __init__(self):
        # Small and efficient model suitable for our project
        self.model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

    def generate_embedding(self, text: str) -> list[float]:
        """
        Convert feedback text into a numerical vector.
        """

        if not text or not text.strip():
            raise ValueError("Text cannot be empty.")

        embedding = self.model.encode(
            text,
            normalize_embeddings=True,
        )

        return embedding.tolist()


embedding_service = EmbeddingService()