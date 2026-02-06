import { NextResponse } from "next/server";

const GOAPI_BASE_URL = "https://api.goapi.ai/api/v1/suno";

// POST: Start Music Generation Task
export async function POST(req: Request) {
  try {
    const requestPayload = await req.json();
    console.log("Music API [Start] Hit. Body:", requestPayload);

    const { prompt } = requestPayload;
    // Note: customMode=true allows custom lyrics, but for simple prompts we use standard generation.
    // GoAPI usually requires "prompt" for description-based generation.
    // If user wants custom lyrics, we'd use "lyrics" field and "custom_mode": true.
    // For now, mapping general prompt to simple generation.

    const apiKey = process.env.GOAPI_KEY;

    if (!apiKey) {
      console.warn("Missing GOAPI_KEY environment variable.");
      return NextResponse.json(
        { error: "GoAPI (Suno) key not configured." },
        { status: 500 }
      );
    }

    const response = await fetch(`${GOAPI_BASE_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        prompt: prompt,
        mv: "chirp-v3-0", // Using v3 for better quality
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GoAPI Create Error:", errorText);
      return NextResponse.json(
        { error: `Provider error: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    // GoAPI response structure: { data: { task_id: "..." }, code: 200, ... }
    const taskId = data.data?.task_id;

    if (!taskId) {
      throw new Error("No task_id returned from provider");
    }

    return NextResponse.json({
      success: true,
      taskId: taskId,
      message: "Music generation started",
      provider: "GoAPI/Suno"
    });

  } catch (error) {
    console.error("Music Generation Start Error:", error);
    return NextResponse.json(
      { error: "Failed to start music generation", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// GET: Check Task Status
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return NextResponse.json({ error: "Missing taskId" }, { status: 400 });
    }

    const apiKey = process.env.GOAPI_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
    }

    const response = await fetch(`${GOAPI_BASE_URL}/get?task_id=${taskId}`, {
      headers: {
        "X-API-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Provider check failed: ${response.statusText}`);
    }

    const data = await response.json();
    // GoAPI Get response: { data: { status: "completed", clips: { "id": ... "audio_url": ... } } }

    // Status can be: 'processing', 'completed', 'failed'
    const status = data.data?.status;

    // GoAPI returns "clips" object/map. We usually get 2 clips per generation.
    // Let's pick the first one if completed.
    let audioUrl = null;
    let clipId = null;

    if (status === "completed" && data.data?.clips) {
      // clips is an object where keys are clip_ids.
      const clipKeys = Object.keys(data.data.clips);
      if (clipKeys.length > 0) {
        const firstClip = data.data.clips[clipKeys[0]];
        audioUrl = firstClip.audio_url;
        clipId = firstClip.id;
      }
    }

    return NextResponse.json({
      taskId,
      status: status, // 'processing' | 'completed' | 'failed'
      audioUrl: audioUrl,
      clipId: clipId,
      fullData: data.data // Debugging
    });

  } catch (error) {
    console.error("Music Status Check Error:", error);
    return NextResponse.json(
      { error: "Failed to check status", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
