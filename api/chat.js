export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    // Check API Key
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        error: "OPENROUTER_API_KEY is missing.",
      });
    }

    console.log("User:", message);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://rashidv-dev.vercel.app",
          "X-Title": "Rashid Portfolio",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o",
          messages: [
            {
              role: "system",
              content: `
You are Rashid V's AI Portfolio Assistant.

About Rashid:
- Flutter Developer
- React Developer
- Firebase
- REST API
- Riverpod
- Django
- Python
- Based in Kerala, India

Only answer questions about Rashid's:
- Skills
- Projects
- Experience
- Resume
- Contact

If the user asks unrelated questions,
politely explain that you're only Rashid's portfolio assistant.
              `,
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    const data = await response.json();

    console.log("OpenRouter Status:", response.status);
    console.log(JSON.stringify(data, null, 2));

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data?.error?.message ||
          data?.message ||
          "OpenRouter request failed.",
        details: data,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Server Error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
}