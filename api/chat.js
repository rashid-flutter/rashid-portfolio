export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { message } = req.body;

    // Check API Key
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        error: "OPENROUTER_API_KEY is missing.",
      });
    }

    console.log("Message:", message);
    console.log(
      "API Key:",
      process.env.OPENROUTER_API_KEY.substring(0, 15) + "..."
    );

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Rashid Portfolio",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o",
          messages: [
            {
              role: "system",
              content: `
You are Rashid V's AI Portfolio Assistant.

Only answer questions about:
- Rashid V
- Flutter
- React
- Firebase
- Projects
- Experience
- Skills
- Resume
- Contact

If the user asks unrelated questions,
politely reply that you are only Rashid's portfolio assistant.
              `,
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Backend Error:", error);

    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
}