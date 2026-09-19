from app.services.embedding_service import embedding_service


text = "The analytics dashboard is slow and sometimes crashes."

embedding = embedding_service.generate_embedding(text)

print("Embedding generated successfully!")
print("Dimensions:", len(embedding))
print("First 5 values:", embedding[:5])