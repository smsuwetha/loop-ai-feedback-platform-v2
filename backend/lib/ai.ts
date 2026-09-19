const AI_SERVICE_URL =
  process.env.AI_SERVICE_URL || "http://localhost:8000";

export interface EmbeddingResponse {
  embedding: number[];
  model: string;
  dimensions: number;
}

export interface ThemeResult {
  name: string;
  confidence: number;
}

export interface ClassificationResponse {
  sentiment: "POS" | "NEU" | "NEG";
  sentimentScore: number;
  featureArea: string;
  rationale: string;
  themes: ThemeResult[];
}

export async function generateEmbedding(
  text: string
): Promise<EmbeddingResponse> {
  if (!text || !text.trim()) {
    throw new Error("Text is required for embedding.");
  }

  const response = await fetch(
    `${AI_SERVICE_URL}/api/ai/embed`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text.trim(),
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `AI embedding service failed: ${response.status} ${errorText}`
    );
  }

  return response.json();
}

export async function classifyFeedback(
  feedback: string
): Promise<ClassificationResponse> {
  if (!feedback || !feedback.trim()) {
    throw new Error("Feedback is required for classification.");
  }

  const response = await fetch(
    `${AI_SERVICE_URL}/api/ai/classify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feedback: feedback.trim(),
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `AI classification service failed: ${response.status} ${errorText}`
    );
  }

  return response.json();
}