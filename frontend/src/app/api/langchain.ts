import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

export async function testChatOpenAI() {
  try {
    const llm = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0,
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await llm.invoke([{ role: "user", content: "Hi im bob" }]);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
console.log("Success_____________");

testChatOpenAI();

// const llm = new ChatOpenAI({
//   model: "gpt-4o-mini",
//   temperature: 0,
// });

// const response = await llm.invoke([{ role: "user", content: "Hi im bob" }]);
// console.log(response);
console.log("LangChain file loaded");
