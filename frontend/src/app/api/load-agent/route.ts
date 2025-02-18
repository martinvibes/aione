// app/api/load-agent/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch(
      "https://zerepy-2.onrender.com/agents/aione/load",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to load agent" },
      { status: 500 }
    );
  }
}
