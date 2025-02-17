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
  - If user says "check balance" or similar without specifying token, set intent: "checkBalance" and sourceToken: null
  - If user mentions "S token" or "S balance", set intent: "checkBalance" and sourceToken: "S"
  - If user mentions other tokens (e.g., "ANON balance"), set intent: "checkBalance" and sourceToken: "ANON"
  - If user provides wallet and token addresses, set:
    * intent: "checkBalance_addresses"
    * walletAddress: (the wallet address)
    * tokenAddress: (the token address)
  - Keep all responses concise
  For swap requests:
  - If user mentions 'swap', ask for source and destination tokens
  - If user provides tokens in format like "swap 1 SOL for USDT", extract these details
  - Keep responses concise
  For price prediction
  - If user mention 'prediction', ask for token name 
  - If user provide token in format like 'price prediction of SOL' extract the token
  - Keep responses concise
  For get token by ticker requests:
  - If user says "get token ticker" without specifics, set intent: "getTokenTicker" with no sourceToken
  - If user provides token name (e.g., "get token ticker for ANON"), set:
    * intent: "getTokenTicker"
    * sourceToken: "ANON" (the specified token)
  - Keep responses concise`;

  const generalResponseDesc = ` Examine the feedback provided by the user and craft a response that is easy to understand, addressing their prompt thoughtfully. Alo make it engaging and informative.`;

  const IntentSchema = z.object({
    intent: z
      .enum([
        "swap",
        "checkBalance",
        "checkBalance_addresses",
        "transfer",
        "normalChat",
        "unknown",
        "prediction",
        "getTokenTicker",
      ])
      .describe(formatInstructions),
    amount: z.number().optional(),
    sourceToken: z.string().optional(),
    walletAddress: z.string().optional(), // Wallet address for balance check
    tokenAddress: z.string().optional(),
    destinationToken: z.string().optional(),
    recipientAddress: z.string().optional(),
    transferCurrency: z.enum(["S", "USDT"]).optional(),
    pridictTokenName: z.string().optional(),
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
    // console.log(response);

    return response;
  } catch (error) {
    console.error(error);
  }
}

// responseFromChatOpenAi("will nigeria be great again");

// const llm = new ChatOpenAI({
//   model: "gpt-4o-mini",
//   temperature: 0,
// });

// const response = await llm.invoke([{ role: "user", content: "Hi im bob" }]);
// console.log(response);
