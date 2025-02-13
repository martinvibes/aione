import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export async function responseFromChatOpenAi(question: string) {
  const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
    openAIApiKey:
      "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",
  });

  const formatInstructions = `
  For transfer requests:
  - If user mentions 'transfer', ask for amount and recipient address
  - If user provides amount and address in format like "transfer 1 SOL to address", extract these details
  - Keep responses concise
  For balance check requests:
  - If user mentions 'balance', ask for token
  - If user provides token in format like "check balance of USDT", extract the token
  - Keep responses concise
  For swap requests:
  - If user mentions 'swap', ask for source and destination tokens
  - If user provides tokens in format like "swap 1 SOL for USDT", extract these details
  - Keep responses concise`;

  const generalResponseDesc = ` Examine the feedback provided by the user and craft a response that is easy to understand, addressing their prompt thoughtfully. Alo make it engaging and informative.`;

  const IntentSchema = z.object({
    intent: z
      .enum(["swap", "checkBalance", "transfer", "normalChat", "unknown"])
      .describe(formatInstructions),
    amount: z.number().optional(),
    sourceToken: z.string().optional(),
    destinationToken: z.string().optional(),
    recipientAddress: z.string().optional(),
    transferCurrency: z.enum(["S", "USDT"]).optional(),
    error: z.string().optional(),
    generalResponse: z.string().describe(generalResponseDesc),
  });

  const llmStructured = llm.withStructuredOutput(IntentSchema);

  try {
    const response = await llmStructured.invoke([
      {
        role: "user",
        content: question,
      },
    ]);
    console.log(response);

    return response;
  } catch (error) {
    console.error(error);
  }
}

responseFromChatOpenAi("will nigeria be great again");

// const llm = new ChatOpenAI({
//   model: "gpt-4o-mini",
//   temperature: 0,
// });

// const response = await llm.invoke([{ role: "user", content: "Hi im bob" }]);
// console.log(response);
