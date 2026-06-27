const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function askLawAI(userMessage) {
  const systemPrompt = `
You are a Legal Assistant AI.

Rules:
1. Answer ONLY law-related questions.
2. If the question is not related to law, reply exactly:

"I'm a legal assistant and can only help with law-related questions. Please ask me something related to legal matters."

3. Every legal answer must end with:

"Disclaimer: This information is for educational purposes only and does not constitute legal advice."
`;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.3,
      }),
    }
  );

  const data = await response.json();

  return data.choices[0].message.content;
}