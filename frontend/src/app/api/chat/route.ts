// app/api/chat/route.ts
import { testChatOpenAI } from "@/app/api/langchain";

export async function GET() {
  try {
    const response = await testChatOpenAI();
    return Response.json({ response });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Failed to process" }, { status: 500 });
  }
}
