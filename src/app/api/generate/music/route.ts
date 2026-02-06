import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const requestPayload = await req.json()
    console.log("Music API Hit. Body:", requestPayload);
    const { prompt, duration, mode } = requestPayload;
    const pat = process.env.MUBERT_PAT
    console.log("Mubert PAT configured:", !!pat);

    if (!pat) {
      console.warn("Missing MUBERT_PAT environment variable.")
      // Return a mock response if no key is present, to allow UI testing
      // or error out if strict. Let's error out to prompt the user to add it,
      // but maybe include a "demo" mode fallback if we wanted.
      // For now, let's return a specific error so the UI can show a helpful message.
      return NextResponse.json(
        { error: "Mubert API key not configured. Please add MUBERT_PAT to env." },
        { status: 500 }
      )
    }

    console.log("Generating music with Mubert...", { prompt, duration, mode })

    // Mubert API: TTMRecord (Text-to-Music)
    // Docs target: https://api-b2b.mubert.com/v2/TTMRecord
    const body = {
      method: "TTMRecord",
      params: {
        text: prompt,
        duration: parseInt(duration),
        pat: pat,
        mode: mode || "track", // 'track', 'loop', 'jingle', 'mix'
      },
    }

    const response = await fetch("https://api-b2b.mubert.com/v2/TTMRecord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Mubert API Error:", errorText)
      return NextResponse.json(
        { error: `Mubert API error: ${response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log("Mubert response:", data)

    // The data.data should contain the download link usually, or a task ID.
    // For TTMRecord, it usually returns the track immediately or a link.
    // Structure typically: { data: { tasks: [ { task_id, ... } ] } } or direct url inside.
    // Wait, Mubert often is async or returns a direct link depending on the method.
    // Let's assume standard response structure verification is needed.
    // Based on common knowledge, 'TTMRecord' returns a URL in data.

    // Check for inner data
    if (data.data) {
      // data.data could be the URL string or an object containing it
      // Depending on specific API version (v2).
      // Let's pass the whole data object back for the frontend to parse,
      // or refine if we see the structure.
      return NextResponse.json(data)
    } else {
      return NextResponse.json(
        { error: "Invalid response from Mubert", details: data },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error("Internal Server Error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
