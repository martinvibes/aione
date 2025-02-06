"use client"
import { AlloraAPIClient, ChainSlug, PriceInferenceTimeframe, PriceInferenceToken, } from "@alloralabs/allora-sdk";

const alloraClient = new AlloraAPIClient({
  chainSlug:ChainSlug.TESTNET ,//ChainSlug.TESTNET,
  apiKey: "UP-8cbc632a67a84ac1b4078661", // Optional
});


const page = ()=>{
    async function test(){
      // Fetch Allora topics
      const topics = await alloraClient.getAllTopics();
      console.log(topics);

      //Fetch topic inference by ID
      const ethPrice5m = await alloraClient.getInferenceByTopicID(5);
      console.log(ethPrice5m);
      //console.log("btc 8h")
      const btc8h = await alloraClient.getPriceInference(
        PriceInferenceToken.BTC,
        PriceInferenceTimeframe.EIGHT_HOURS
      );
      // Fetch asset price inference
      console.log(btc8h);
    }

return <div className="text-white p-16">
    <h1>hello allora</h1>
    <button onClick={()=>test()}  className="text-white  bg-inherit border rounded-md p-4 m-7">allora sdk</button>
</div>
}
export default page