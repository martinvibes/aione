import { AlloraAPIClient, ChainSlug } from "@alloralabs/allora-sdk";
import { Message } from "./types";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const alloraClient = new AlloraAPIClient({
  chainSlug: ChainSlug.TESTNET, //ChainSlug.TESTNET,
  apiKey: "UP-8cbc632a67a84ac1b4078661", // Optional
});

export async function pricePridictionHandle(
  tokenName: string,
  response: string,
  messages: Message[],
  setMessages: (data: Message[]) => void,
  setMessagesInStorage: (data: Message[]) => void
) {

  // price pridiction function
  async function alloraPricePridiction(id: number) {
    const pridictedPriceIn8h = await alloraClient.getInferenceByTopicID(id);
    const data = Number(
      pridictedPriceIn8h?.inference_data?.network_inference_normalized
    );
    return usd.format(data);
  }

  function pridictionConsiseAnswer(
    amount: string,
    token: string,
    time: string
  ) {
    return `Based on technical analysis, ${token} is predicted to reach ${amount} in the next ${time} hours.`;
  }

  if (tokenName !== "") {
    switch (tokenName.toLocaleLowerCase()) {
      case "sol":
        const sol8h = await alloraPricePridiction(38);

        const aiPridictionSol8h: Message = {
          content: pridictionConsiseAnswer(sol8h, "SOL/USD", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
        };
        setMessagesInStorage([...messages, aiPridictionSol8h]);
        setMessages([...messages, aiPridictionSol8h]);
        break;
      case "btc":
        const btc8h = await alloraPricePridiction(42);

        const aiPridictionBtc8h: Message = {
          content: pridictionConsiseAnswer(btc8h, "BTC/USD", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
        };
        setMessagesInStorage([...messages, aiPridictionBtc8h]);
        setMessages([...messages, aiPridictionBtc8h]);
        break;
      case "eth":
        const eth8h = await alloraPricePridiction(41);

        const aiPridictionEth8h: Message = {
          content: pridictionConsiseAnswer(eth8h, "ETH/USD", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
        };
        setMessagesInStorage([...messages, aiPridictionEth8h]);
        setMessages([...messages, aiPridictionEth8h]);
        break;
      case "luna":
        const luna8h = await alloraPricePridiction(33);

        const aiPridictionLuna8h: Message = {
          content: pridictionConsiseAnswer(luna8h, "Luna/USDT", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
        };
        setMessagesInStorage([...messages, aiPridictionLuna8h]);
        setMessages([...messages, aiPridictionLuna8h]);
        break;
      case "virtual":
        const virtual8h = await alloraPricePridiction(31);

        const aiPridictionVirtual8h: Message = {
          content: pridictionConsiseAnswer(virtual8h, "Virtual/USDT", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
        };
        setMessagesInStorage([...messages, aiPridictionVirtual8h]);
        setMessages([...messages, aiPridictionVirtual8h]);
        break;
      case "sekoia":
        const sekoia8h = await alloraPricePridiction(36);

        const aiPridictionSekoia8h: Message = {
          content: pridictionConsiseAnswer(sekoia8h, "Sekoia/USDT", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
        };
        setMessagesInStorage([...messages, aiPridictionSekoia8h]);
        setMessages([...messages, aiPridictionSekoia8h]);
        break;
      case "game":
        const game8h = await alloraPricePridiction(35);

        const aiPridictionGame8h: Message = {
          content: pridictionConsiseAnswer(game8h, "Game/USDT", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
        };
        setMessagesInStorage([...messages, aiPridictionGame8h]);
        setMessages([...messages, aiPridictionGame8h]);
        break;
      case "vaderai":
        const vaderai8h = await alloraPricePridiction(34);

        const aiPridictionVaderai8h: Message = {
          content: pridictionConsiseAnswer(vaderai8h, "VaderAi/USDT", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
        };
        setMessagesInStorage([...messages, aiPridictionVaderai8h]);
        setMessages([...messages, aiPridictionVaderai8h]);
        break;
      case "aixbt":
        const aixbt8h = await alloraPricePridiction(32);

        const aiPridictionAixbt8h: Message = {
          content: pridictionConsiseAnswer(aixbt8h, "Aixbt/USDT", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
        };
        setMessagesInStorage([...messages, aiPridictionAixbt8h]);
        setMessages([...messages, aiPridictionAixbt8h]);
        break;
      case "bnb":
        const bnb8h = await alloraPricePridiction(8);

        const aiPridictionBnb8h: Message = {
          content: pridictionConsiseAnswer(bnb8h, "BNB", "20m"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
        };
        setMessagesInStorage([...messages, aiPridictionBnb8h]);
        setMessages([...messages, aiPridictionBnb8h]);
        break;
      case "arb":
        const arb8h = await alloraPricePridiction(9);

        const aiPridictionArb8h: Message = {
          content: pridictionConsiseAnswer(arb8h, "Arb", "20m"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
        };
        setMessagesInStorage([...messages, aiPridictionArb8h]);
        setMessages([...messages, aiPridictionArb8h]);
        break;
      case "memecoin":
        const memecoin8h = await alloraPricePridiction(10);

        const aiPridictionMemecoin8h: Message = {
          content: pridictionConsiseAnswer(memecoin8h, "Memecoin", "1h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
        };
        setMessagesInStorage([...messages, aiPridictionMemecoin8h]);
        setMessages([...messages, aiPridictionMemecoin8h]);
        break;
      default:
        const aiDefaultMessage: Message = {
          content: `Price prediction data for this token is not available yet. Please check back in 8 hours when our analysis will be complete.`,
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
        };
        setMessagesInStorage([...messages, aiDefaultMessage]);
        setMessages([...messages, aiDefaultMessage]);
        break;
    }
  } else {
    const aiPridiction: Message = {
      content: response ?? "",
      sender: "agent",
      id: Date.now().toString(),
      agentName: "user",
      intent: "pridiction",
    };
    setMessagesInStorage([...messages, aiPridiction]);
    setMessages([...messages, aiPridiction]);
  }
}
