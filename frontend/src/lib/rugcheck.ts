import { Message } from "@/lib/types";
import { RugCheckData } from "@/lib/types";

export async function rugcheck(
  tokenaddr: string,
  chatId: string,
  messages: Message[],
  setMessages: (messages: Message[]) => void,
  setMessagesInStorage: (messages: Message[]) => void
) {
  // console.log("Rugcheck function called", tokenaddr, chatId);

  const RUG_CHECK_API = "https://api.rugcheck.xyz/v1";
  // console.log(`${RUG_CHECK_API}/tokens/${tokenaddr}/report/summary`);
  if (tokenaddr == "") {
    const aiMessage: Message = {
      content:
        "Hey There, Looks like youre trying to rug check a token on solana, PLease provide a valid token address on solana blockchain for rugcheck",
      sender: "agent",
      id: Date.now().toString(),
      intent: "rugcheck",
    };
    setMessagesInStorage([...messages, aiMessage]);
    setMessages([...messages, aiMessage]);
    return;
  }
  try {
    const response = await fetch(
      `${RUG_CHECK_API}/tokens/${tokenaddr}/report/summary`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RugCheckData = await response.json();
    // console.log("Rugcheck data", data);
    const aiMessage: Message = {
      content: "",
      sender: "agent",
      id: Date.now().toString(),
      intent: "rugcheck",
      component: {
        type: "RugCheck",
        props: {
          data: data,
          mint: tokenaddr,
        },
      },
    };
    setMessagesInStorage([...messages, aiMessage]);
    setMessages([...messages, aiMessage]);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.log("Rugcheck error", error);
    const aiMessage: Message = {
      content: `Hey There, There was an error fetching the Rugcheck data of the ${tokenaddr} token. Please try again later or change the token address.`,
      sender: "agent",
      id: Date.now().toString(),
      intent: "rugcheck",
    };
    setMessagesInStorage([...messages, aiMessage]);
    setMessages([...messages, aiMessage]);
    return;
  }
}
