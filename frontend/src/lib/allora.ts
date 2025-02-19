import { AlloraAPIClient, ChainSlug } from "@alloralabs/allora-sdk";
import { Message } from "./types";
import { fetchCoinGeckoPrice } from "@/app/hooks/useCoinGecko";

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
    return `Based on comprehensive technical analysis of ${token} Allora suggest the price could drive to ${amount} in the next ${time} hours. Note: This analysis is for educational purposes only and should not be considered as financial advice. Always conduct your own research and consider your risk tolerance before making any investment decisions.`;
  }

  if (tokenName !== "") {
    switch (tokenName.toLocaleLowerCase()) {
      case "sol":
        const sol8h = await alloraPricePridiction(38);

        const solprice = await fetchCoinGeckoPrice("solana");
        console.log(solprice);
        const aiPridictionSol8h: Message = {
          content: pridictionConsiseAnswer(sol8h, "SOL/USD", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
          component: {
            type: "chart",
            props: {
              token: "sol",
              pair: "USDT",
              timeLeft: "8h",
              currentPrice: solprice?.solana.usd,
              marketCap: solprice?.solana.usd_market_cap,
              forecastedPrice: sol8h,
              chartToken: "solana",
            },
          },
        };
        setMessagesInStorage([...messages, aiPridictionSol8h]);
        setMessages([...messages, aiPridictionSol8h]);
        break;
      case "btc":
        const btc8h = await alloraPricePridiction(42);
        const btcprice = await fetchCoinGeckoPrice("bitcoin");
        console.log("lorem ", btcprice);
        const aiPridictionBtc8h: Message = {
          content: pridictionConsiseAnswer(btc8h, "BTC/USD", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
          component: {
            type: "chart",
            props: {
              token: "btc",
              pair: "USDT",
              timeLeft: "8h",
              currentPrice: btcprice?.bitcoin.usd,
              marketCap: btcprice?.bitcoin.usd_market_cap,
              forecastedPrice: btc8h,
              chartToken: "bitcoin",
            },
          },
        };
        console.log("Debug - chartToken being set:", aiPridictionBtc8h);

        setMessagesInStorage([...messages, aiPridictionBtc8h]);
        setMessages([...messages, aiPridictionBtc8h]);
        break;
      case "eth":
        const eth8h = await alloraPricePridiction(41);
        const ethprice = await fetchCoinGeckoPrice("ethereum");
        const aiPridictionEth8h: Message = {
          content: pridictionConsiseAnswer(eth8h, "ETH/USD", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
          component: {
            type: "chart",
            props: {
              token: "eth",
              pair: "USDT",
              timeLeft: "8h",
              currentPrice: ethprice?.ethereum.usd,
              marketCap: ethprice?.ethereum.usd_market_cap,
              forecastedPrice: eth8h,
              chartToken: "ethereum",
            },
          },
        };
        setMessagesInStorage([...messages, aiPridictionEth8h]);
        setMessages([...messages, aiPridictionEth8h]);
        break;
      case "luna":
        const luna8h = await alloraPricePridiction(33);
        const lunaprice = await fetchCoinGeckoPrice("terra-luna");
        const aiPridictionLuna8h: Message = {
          content: pridictionConsiseAnswer(luna8h, "Luna/USDT", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
          component: {
            type: "chart",
            props: {
              token: "luna",
              pair: "USDT",
              timeLeft: "8h",
              currentPrice: lunaprice?.["terra-luna"]?.usd,
              marketCap: lunaprice?.["terra-luna"]?.usd_market_cap,
              forecastedPrice: luna8h,
              chartToken: "terra-luna",
            },
          },
        };
        setMessagesInStorage([...messages, aiPridictionLuna8h]);
        setMessages([...messages, aiPridictionLuna8h]);
        break;
      case "virtual":
        const virtual8h = await alloraPricePridiction(31);
        const virtualprice = await fetchCoinGeckoPrice("virtual-protocol");
        const aiPridictionVirtual8h: Message = {
          content: pridictionConsiseAnswer(virtual8h, "Virtual/USDT", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
          component: {
            type: "chart",
            props: {
              token: "virtual",
              pair: "USDT",
              timeLeft: "8h",
              currentPrice: virtualprice?.["virtual-protocol"].usd,
              marketCap: virtualprice?.["virtual-protocol"].usd_market_cap,
              forecastedPrice: virtual8h,
              chartToken: "virtual-protocol",
            },
          },
        };
        setMessagesInStorage([...messages, aiPridictionVirtual8h]);
        setMessages([...messages, aiPridictionVirtual8h]);
        break;
      case "sekoia":
        const sekoia8h = await alloraPricePridiction(36);
        const sekoiaprice = await fetchCoinGeckoPrice("sekoia-by-virtuals");
        const aiPridictionSekoia8h: Message = {
          content: pridictionConsiseAnswer(sekoia8h, "Sekoia/USDT", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
          component: {
            type: "chart",
            props: {
              token: "sekoia",
              pair: "USDT",
              timeLeft: "8h",
              currentPrice: sekoiaprice?.["sekoia-by-virtuals"].usd ?? 0,
              marketCap:
                sekoiaprice?.["sekoia-by-virtuals"].usd_market_cap ?? 0,
              forecastedPrice: sekoia8h,
              chartToken: "sekoia-by-virtuals",
            },
          },
        };
        setMessagesInStorage([...messages, aiPridictionSekoia8h]);
        setMessages([...messages, aiPridictionSekoia8h]);
        break;
      case "game":
        const game8h = await alloraPricePridiction(35);
        const gameprice = await fetchCoinGeckoPrice("yield-guild-games");
        const aiPridictionGame8h: Message = {
          content: pridictionConsiseAnswer(game8h, "Game/USDT", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
          component: {
            type: "chart",
            props: {
              token: "game",
              pair: "USDT",
              timeLeft: "8h",
              currentPrice: gameprice?.["yield-guild-games"].usd,
              marketCap: gameprice?.["yield-guild-games"].usd_market_cap,
              forecastedPrice: game8h,
              chartToken: "yield-guild-games",
            },
          },
        };
        setMessagesInStorage([...messages, aiPridictionGame8h]);
        setMessages([...messages, aiPridictionGame8h]);
        break;
      case "vaderai":
        const vaderai8h = await alloraPricePridiction(34);
        const vaderaiprice = await fetchCoinGeckoPrice("vaderai-by-virtuals");
        const aiPridictionVaderai8h: Message = {
          content: pridictionConsiseAnswer(vaderai8h, "VaderAi/USDT", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
          component: {
            type: "chart",
            props: {
              token: "vaderai",
              pair: "USDT",
              timeLeft: "8h",
              currentPrice: vaderaiprice?.["vaderai-by-virtuals"].usd,
              marketCap: vaderaiprice?.["vaderai-by-virtuals"].usd_market_cap,
              forecastedPrice: vaderai8h,
              chartToken: "vaderai-by-virtuals",
            },
          },
        };
        setMessagesInStorage([...messages, aiPridictionVaderai8h]);
        setMessages([...messages, aiPridictionVaderai8h]);
        break;
      case "aixbt":
        const aixbt8h = await alloraPricePridiction(32);
        const aixbtprice = await fetchCoinGeckoPrice("aixbt");

        const aiPridictionAixbt8h: Message = {
          content: pridictionConsiseAnswer(aixbt8h, "Aixbt/USDT", "8h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
          component: {
            type: "chart",
            props: {
              token: "Aixbt",
              pair: "USDT",
              timeLeft: "8h",
              currentPrice: aixbtprice?.aixbt.usd,
              marketCap: aixbtprice?.aixbt.usd_market_cap,
              forecastedPrice: aixbt8h,
            },
          },
        };

        setMessagesInStorage([...messages, aiPridictionAixbt8h]);
        setMessages([...messages, aiPridictionAixbt8h]);
        break;
      case "bnb":
        const bnb8h = await alloraPricePridiction(8);
        const bnbprice = await fetchCoinGeckoPrice("bnb");
        const aiPridictionBnb8h: Message = {
          content: pridictionConsiseAnswer(bnb8h, "BNB", "20m"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
          component: {
            type: "chart",
            props: {
              token: "bnb",
              pair: "USDT",
              timeLeft: "8h",
              currentPrice: bnbprice?.bnb.usd,
              marketCap: bnbprice?.bnb.usd_market_cap,
              forecastedPrice: bnb8h,
            },
          },
        };
        setMessagesInStorage([...messages, aiPridictionBnb8h]);
        setMessages([...messages, aiPridictionBnb8h]);
        break;
      case "arb":
        const arb8h = await alloraPricePridiction(9);
        const arbprice = await fetchCoinGeckoPrice("arbitrum");
        const aiPridictionArb8h: Message = {
          content: pridictionConsiseAnswer(arb8h, "Arb", "20m"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
          component: {
            type: "chart",
            props: {
              token: "arb",
              pair: "USDT",
              timeLeft: "8h",
              currentPrice: arbprice?.arbitrum.usd,
              marketCap: arbprice?.arbitrum.usd_market_cap,
              forecastedPrice: arb8h,
              chartToken: "arbitrum",
            },
          },
        };
        setMessagesInStorage([...messages, aiPridictionArb8h]);
        setMessages([...messages, aiPridictionArb8h]);
        break;
      case "memecoin":
        const memecoin8h = await alloraPricePridiction(10);
        const memecoinprice = await fetchCoinGeckoPrice("meme");
        const aiPridictionMemecoin8h: Message = {
          content: pridictionConsiseAnswer(memecoin8h, "Memecoin", "1h"),
          sender: "agent",
          id: Date.now().toString(),
          agentName: "allora",
          intent: "pridiction",
          component: {
            type: "chart",
            props: {
              token: "memecoin",
              pair: "USDT",
              timeLeft: "8h",
              currentPrice: memecoinprice?.meme.usd,
              marketCap: memecoinprice?.meme.usd_market_cap,
              forecastedPrice: memecoin8h,
              chartToken: "meme",
            },
          },
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
