import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export async function responseFromChatOpenAi(question: string) {
  const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const formatInstructions = `
 For transfer requests:
  - If user mentions 'transfer', or "I want to swap"   - If user just says "swap" or "I want to swap" without details:
  * set intent: "transfer"
  * don't set any other fields
  - If user provides transfer details like "transfer 1 sonic to 0x0123" or "transfer 1 sonic to name"
  * set intent: "transfer"
  * set recipientAddress: (to recipient address)
  * set amount: (the amount to transfer)
  * set recipientName: (to recipient name)
  - If user provides addresses in format "transferto:ADDRESS amount:NUMBER":
    * set intent: "transfer"
    * set recipientAddress: (to address)
    * set amount: (the specified amount)
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
  - If user just says "swap" or "I want to swap" without details:
    * set intent: "swap"
    * don't set any other fields
  - If user provides swap details like "swap 1 ETH for USDT":
    * set intent: "swap"
    * set sourceToken: (from token address)
    * set destinationToken: (to token address)
    * set amount: (the amount to swap)
  - If user provides addresses in format "swapfrom:ADDRESS swapto:ADDRESS amount:NUMBER":
    * set intent: "swap"
    * set sourceToken: (from address)
    * set destinationToken: (to address)
    * set amount: (the specified amount)
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
        "rugcheck",
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
    tokenaddresstorugcheck: z.string().optional(),
    recipientName: z.string().optional(),
  });

  const llmStructured = llm.withStructuredOutput(IntentSchema);

  try {
    const response = await llmStructured.invoke([
      {
        role: "user",
        content: question,
      },
    ]);

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
