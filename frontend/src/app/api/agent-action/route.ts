import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch("https://zerepy-2.onrender.com/agent/action", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in agent action:", error);
    return NextResponse.json(
      { error: "Failed to execute agent action" },
      { status: 500 }
    );
  }
}
