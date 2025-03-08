import { useContext, useEffect, useMemo } from "react";
import { responseFromChatOpenAi } from "../api/langchain";
import { Message } from "@/lib/types";
import { MessageContext } from "../useContext/message-context";
import { useParams } from "next/navigation";
import { useLocalStorage } from "./useLocalStorage";
import { pricePridictionHandle } from "@/lib/allora";
import { checkBalance } from "./useBalanceResponse";
import { getTokenTickerData } from "./useGetTokensSticker";
import { rugcheck } from "@/lib/rugcheck";
import { swapTokenData } from "./useSwapAction";
import { transferTokenData } from "./useTransferAction";
import { useTransactionHistory } from "./useTransactionHistory";
import { data, getLocalSstorageAddress, getLocalStorageTokens } from "@/lib/helper";

export function useAiResponse(
  pendingMessage: string | null,
  setPendingMessage: (e: null) => void
) {
  const { messages, setMessages, setIsLoading } = useContext(MessageContext);
  const params = useParams();
  const chatId = params.chatid as string;
  const { setMessagesInStorage } = useLocalStorage(chatId);
  const { saveTransaction } = useTransactionHistory();
  const storageData: data = getLocalSstorageAddress();
  const storeContact = useMemo(() => storageData, [storageData]);
  useEffect(() => {
    async function getAIResponse() {
      if (!pendingMessage) return;
      try {
        setIsLoading(true);
        const airResponse = await responseFromChatOpenAi(pendingMessage);
        if (airResponse === undefined) {
          throw new Error(
            `Sorry, I encountered an error processing your request.`
          );
        }

        switch (airResponse?.intent) {
          case "swap":
            const tokenLocalStorage:data = getLocalStorageTokens(); 
            const destinationTokenData = tokenLocalStorage.find(
              (token) =>
                token.name === airResponse.destinationToken ||
                token.address === airResponse.destinationToken
            );
             const sourceTokenData = tokenLocalStorage.find(
               (token) =>
                 token.address === airResponse.sourceToken ||
                 token.name === airResponse.sourceToken
             );

             const swapFrom = sourceTokenData?.address || airResponse.sourceToken
             const swapTo = destinationTokenData?.address || airResponse.destinationToken
            
              await swapTokenData(
                swapFrom,
                swapTo,
                airResponse.amount,
                chatId,
                messages,
                setMessages,
                setMessagesInStorage,
                saveTransaction
              );
            setIsLoading(false);
            break;
          case "checkBalance":
            if (!airResponse.sourceToken) {
              const promptMessage: Message = {
                content:
                  "Which token's balance would you like to check? (e.g., S, ANON, etc.)",
                sender: "agent",
                id: Date.now().toString(),
                intent: "checkBalance",
              };
              setMessagesInStorage([...messages, promptMessage]);
              setMessages((messages) => [...messages, promptMessage]);
              setIsLoading(false);
            } else if (airResponse.sourceToken.toUpperCase() === "S") {
              const balanceData = await checkBalance();
              const balanceMessage: Message = {
                content: "",
                sender: "agent",
                id: Date.now().toString(),
                intent: "checkBalance",
                component: {
                  type: "BalanceDisplay",
                  props: {
                    balance: balanceData?.result || 0,
                    tokenName: "S",
                  },
                },
              };
              setMessagesInStorage([...messages, balanceMessage]);
              setMessages((messages) => [...messages, balanceMessage]);
            } else {
              const promptMessage: Message = {
                content: `For checking ${airResponse.sourceToken} balance, please provide:\n1. Wallet address\n2. Token contract address\n\nFormat: wallet:YOUR_WALLET_ADDRESS token:TOKEN_CONTRACT_ADDRESS`,
                sender: "agent",
                id: Date.now().toString(),
                intent: "checkBalance",
                tokenName: airResponse.sourceToken,
              };
              setMessagesInStorage([...messages, promptMessage]);
              setMessages((messages) => [...messages, promptMessage]);
            }
            break;

          case "checkBalance_addresses":
            if (airResponse?.walletAddress && airResponse?.tokenAddress) {
              const balanceData = await checkBalance(
                airResponse.walletAddress,
                airResponse.tokenAddress
              );
              const balanceMessage: Message = {
                content: "",
                sender: "agent",
                id: Date.now().toString(),
                intent: "checkBalance",
                component: {
                  type: "BalanceDisplay",
                  props: {
                    balance: balanceData?.result || 0,
                    tokenName: airResponse.sourceToken || "Token",
                    walletAddress: airResponse.walletAddress,
                    tokenAddress: airResponse.tokenAddress,
                  },
                },
              };
              setMessagesInStorage([...messages, balanceMessage]);
              setMessages((messages) => [...messages, balanceMessage]);
              setIsLoading(false);
            }
            break;
          case "getTokenTicker":
            if (!airResponse.sourceToken) {
              const promptMessage: Message = {
                content:
                  "Please provide the token name for which you would like to get the ticker (e.g., ANON, S, WAGMI, etc.)",
                sender: "agent",
                id: Date.now().toString(),
                intent: "getTokenTicker",
              };
              setMessagesInStorage([...messages, promptMessage]);
              setMessages((messages) => [...messages, promptMessage]);
              setIsLoading(false);
            } else {
              try {
                const tokenTickerData = await getTokenTickerData(
                  airResponse.sourceToken
                );

                if (tokenTickerData?.result) {
                  const tickerMessage: Message = {
                    content: "",
                    sender: "agent",
                    id: Date.now().toString(),
                    intent: "getTokenTicker",
                    component: {
                      type: "TokenTickerDisplay",
                      props: {
                        tokenName: airResponse.sourceToken.toUpperCase(),
                        tokenAddress: tokenTickerData.result,
                      },
                    },
                  };
                  setMessagesInStorage([...messages, tickerMessage]);
                  setMessages((messages) => [...messages, tickerMessage]);
                } else {
                  const notFoundMessage: Message = {
                    content: "",
                    sender: "agent",
                    id: Date.now().toString(),
                    intent: "getTokenTicker",
                    component: {
                      type: "TokenNotFound",
                      props: {
                        tokenName: airResponse.sourceToken,
                      },
                    },
                  };
                  setMessagesInStorage([...messages, notFoundMessage]);
                  setMessages((messages) => [...messages, notFoundMessage]);
                }
              } catch {
                const errorMessage: Message = {
                  content: `Sorry, I encountered an error while fetching the ticker for ${airResponse.sourceToken}.`,
                  sender: "agent",
                  id: Date.now().toString(),
                  intent: "getTokenTicker",
                };
                setMessagesInStorage([...messages, errorMessage]);
                setMessages((messages) => [...messages, errorMessage]);
              }
            }
            break;
          case "normalChat":
            const aiNormlChat: Message = {
              content: airResponse?.generalResponse ?? "",
              sender: "agent",
              id: Date.now().toString(),
              intent: "normalChat",
            };
            setMessagesInStorage([...messages, aiNormlChat]);
            setMessages((messages) => [...messages, aiNormlChat]);
            setIsLoading(false);
            break;
          case "prediction":
            await pricePridictionHandle(
              airResponse.pridictTokenName ?? "",
              airResponse.generalResponse,
              messages,
              setMessages,
              setMessagesInStorage
            );
            setIsLoading(false);
            break;
          case "rugcheck":
            await rugcheck(
              airResponse.tokenAddress ?? "",
              chatId,
              messages,
              setMessages,
              setMessagesInStorage
            );
            setIsLoading(false);
            break;
          case "transfer":
            if (airResponse.recipientName !== "") {
              const user = storeContact.filter((data) =>
                data.name
                  .toLocaleLowerCase()
                  .includes(
                    airResponse?.recipientName?.toLocaleLowerCase() ?? ""
                  )
              );
              if (user.length > 1) {
                const promptMessage: Message = {
                  content: `multiply names with '${airResponse.recipientName}'
                    in your contact list, Please use the full name when referring to contacts, e.g., 'john Doe' instead of variations like John.`,
                  sender: "agent",
                  id: Date.now().toString(),
                  intent: "transfer",
                };
                setMessagesInStorage([...messages, promptMessage]);
                setMessages((messages) => [...messages, promptMessage]);
                setIsLoading(false);
                break;
              }
              if (user.length === 0) {
                const promptMessage: Message = {
                  content: `Sorry, ${airResponse.recipientName} does not exist in your contact list. Please check and try again using the correct full name. or
                  To perform transfer, please provide:
                  1. recipientAddress address (the token you want to transfer to)
                  2. Amount to transfer
    
                  Format: transferto:DESTINATION_ADDRESS amount:AMOUN`,
                  sender: "agent",
                  id: Date.now().toString(),
                  intent: "transfer",
                };
                setMessagesInStorage([...messages, promptMessage]);
                setMessages((messages) => [...messages, promptMessage]);
                setIsLoading(false);
                break;
              } else {
                await transferTokenData(
                  user[0].address,
                  airResponse.amount,
                  chatId,
                  messages,
                  setMessages,
                  setMessagesInStorage,
                  saveTransaction
                );
                setIsLoading(false);
              }
            } else {
              await transferTokenData(
                airResponse.recipientAddress,
                airResponse.amount,
                chatId,
                messages,
                setMessages,
                setMessagesInStorage,
                saveTransaction
              );
              setIsLoading(false);
            }
            break;
          case "unknown":
            const aiUnKnownMessage: Message = {
              content: airResponse?.generalResponse ?? "",
              sender: "agent",
              id: Date.now().toString(),
              intent: "unknown",
            };
            setMessagesInStorage([...messages, aiUnKnownMessage]);
            setMessages((messages) => [...messages, aiUnKnownMessage]);
            setIsLoading(false);
            break;
          default:
            const aiDefaultMessage: Message = {
              content: airResponse?.generalResponse ?? "",
              sender: "agent",
              id: Date.now().toString(),
              intent: "normalChat",
            };
            setMessagesInStorage([...messages, aiDefaultMessage]);
            setMessages((messages) => [...messages, aiDefaultMessage]);
            setIsLoading(false);
        }
      } catch (err) {
        const errorMessage: Message = {
          content: (err as Error)?.message,
          sender: "agent",
          id: Date.now().toString(),
          intent: "unknown",
        };

        setMessages((messages) => [...messages, errorMessage]);
        setMessagesInStorage([...messages, errorMessage]);
        setIsLoading(false);
      }
      setIsLoading(false);
      setPendingMessage(null);
    }

    getAIResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pendingMessage,
    // chatId,
    // messages,
    // setMessages,
    // setMessagesInStorage,
    // setPendingMessage,
  ]);
}
