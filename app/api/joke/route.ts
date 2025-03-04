import { NextResponse } from "next/server"

const 

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") || "general"
  const customPrompt = searchParams.get("prompt")
  const used = searchParams.get("used")?.split(",") || []

  try {
    let prompt = ""

    if (customPrompt) {
      prompt = `Generate a unique, family-friendly joke about ${customPrompt} that hasn't been told before. It should be clean, not offensive, and suitable for children. Make it different from these jokes: ${used.join(", ")}`
    } else {
      prompt = `Generate a unique, family-friendly ${category} joke that hasn't been told before. It should be clean, not offensive, and suitable for children. Make it different from these jokes: ${used.join(", ")}`

      // Add specific instructions for new categories
      switch (category) {
        case "music":
          prompt += " Include musical terms or references in the joke."
          break
        case "sports":
          prompt += " Use sports terminology or reference popular sports in the joke."
          break
        case "movies":
          prompt += " Reference popular movies or film-making terms in the joke."
          break
        case "history":
          prompt += " Include a historical fact or figure in a humorous context."
          break
        case "space":
          prompt += " Use space exploration or astronomical concepts in the joke."
          break
        case "weather":
          prompt += " Incorporate weather phenomena or forecasting terms in a funny way."
          break
        case "travel":
          prompt += " Include references to different cultures, landmarks, or travel experiences."
          break
        case "puns":
          break
        case "dad":
          break
        case "programming":
          break
        case "science":
          break
        case "animal":
          break
        case "food":
          break
        case "wordplay":
          break
        // ... (other categories remain the same)
      }
    }

    console.log

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://vercel.com",
        "X-Title": "JokeGenius AI",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: ,
        messages: [
          {
            role: "system",
            content:
              "You are a family-friendly joke generator. Your jokes are clean, appropriate for all ages, and funny.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("OpenRouter API error response:", errorText)
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    const joke =
      data.choices[0]?.message?.content?.trim() || "Why did the chicken cross the road? To get to the other side!"

    return NextResponse.json({ joke })
  } catch (error: any) {
    console.error("Error generating joke:", error)
    let errorMessage = "Failed to generate joke"
    if (error.message) {
      errorMessage = error.message
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

