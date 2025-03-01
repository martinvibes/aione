import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Image from "next/image";
import demoChatScreen from "../../public/chat-screen.jpg";
import coinGecoBg from "../../public/coingeco.png";
import debridgeBg from "../../public/debridge.png";
import alloraBg from "../../public/allora.svg";


export default function Home() {

  return (
    <div>
      <Navbar />
      <div className="bg-[#72CCD7] w-full text-[#0A0F1E] text-center p-4 my-7">
        <h3>The app is still in testomg and real funds should not be used</h3>
      </div>
      <section className="relative p-4 md:px-14 text-white">
        <header>
          <div className="max-w-[600px] mx-auto text-white">
            <h1 className="text-[50px] text-center font-bold">
              Swap, Bridge & Automate with AI
            </h1>
            <p className="text-center">
              Bridge and swap seamlessly across chains, and automate DeFi
              actions — all powered by AI.
            </p>
          </div>
          <div className="flex justify-center items-center gap-4 my-4">
            <Link
              className="font-bold text-2xl px-4 py-2 rounded-md bg-inherit hover:bg-[#72CCD7] hover:border-transparent border border-[#8DE1FF] text-white hover:text-[#0A0F1E]"
              href={`/chat/${Date.now().toString()}`}
            >
              Launch App
            </Link>
            <button className="font-bold text-2xl px-4 py-2 rounded-md bg-inherit hover:bg-[#72CCD7] hover:border-transparent border border-[#8DE1FF] text-white hover:text-[#0A0F1E]">
              connect wallet
            </button>
          </div>
        </header>
        <div>
          <Image
            className="mx-auto max-w-4xl rounded-lg  w-4/5"
            src={demoChatScreen}
            alt="chat screen demo"
          />
          <div className="text-white text-center p-4">
            <h3>Integrated with</h3>
            <div className="flex justify-center gap-4">
              <div className="flex gap-2 items-center">
                <Image src={alloraBg} alt="allora bg" className="w-7" />
                <h3>ALLORA NETWORK</h3>
              </div>
              <Image src={debridgeBg} alt="debridge logo" />
              <Image src={coinGecoBg} alt="coingeeco logo" />
            </div>
          </div>
          <div className="my-20 text-center grid gap-8">
            <h2 className="font-bold text-3xl">
              One app for all your <br /> DeFi actions!
            </h2>
            <div className="rounded-md w-full h-80 border-[#8DE1FF] border  bg-[#1C2535] flex justify-between p-8">
              <div className="w-full flex flex-col justify-between">
                <div>
                  <h1 className="font-bold text-5xl">AI-Powered Swaps</h1>
                  <p className="text-start max-w-[410px] font-medium text-xl mx-auto">
                    Swap tokens across multiple chains without opening an
                    exchange.
                  </p>
                </div>
                <h2 className=" text-start md:px-20 text-lg font-medium text-[#72CCD7]">
                  Check out swap agent
                </h2>
              </div>
              <div className="border border-[#8DE1FF] w-full" />
            </div>
            <div className="w-full flex justify-between gap-8">
              <div className="rounded-md w-full h-80 border-[#8DE1FF] border  bg-[#1C2535] p-8"></div>
              <div className="rounded-md w-full h-80 border-[#8DE1FF] border  bg-[#1C2535] p-8"></div>
            </div>
          </div>
          <h1 className="text-center font-medium text-3xl">Why Choose Us?</h1>

          <div className="relative grid grid-cols-2 w-fit gap-8 mx-auto rotate-[45deg] my-40">
            <div className="bg-[#1C2535] boder border-[#8DE1FF] w-60 h-60 p-1 rounded-lg text-center grid place-content-center">
              <span className="-rotate-45 font-bold text-xl">
                No need for Centralized Exchanges
              </span>
            </div>
            <div className="bg-[#1C2535] boder borde-[#8DE1FF] w-60 h-60 p-1 rounded-lg text-center grid place-content-center">
              <span className="-rotate-45 font-bold text-xl">
                AI-powered insights for smarter trades
              </span>
            </div>
            <div className="bg-[#1C2535] boder borde-[#8DE1FF] w-60 h-60 p-1 rounded-lg text-center grid place-content-center">
              <span className="-rotate-45 font-bold text-xl">
                One-click execution from chat
              </span>
            </div>
            <div className="bg-[#1C2535] boder borde-[#8DE1FF] w-60 h-60 p-1 rounded-lg text-center grid place-content-center">
              <span className="-rotate-45 font-bold text-xl">
                Low fees & seamless cross-chain transactions
              </span>
            </div>
          </div>
          <div className=" rounded-lg py-20 bg-[#B4D9DD]">
            <h1 className="mx-44 text-center text-[#0A0F1E] font-semibold text-4xl">
              Start Trading & <br /> Automating with AI Now!
            </h1>
            <div className="flex justify-center items-center gap-4 my-4">
              <Link
                className="font-bold text-2xl px-4 py-2 rounded-md hover:bg-[#72CCD7] hover:border-transparent border border-[#8DE1FF] text-white hover:text-white bg-[#0A0F1E]"
                href=""
              >
                Launch App
              </Link>
              <button className="font-bold text-2xl px-4 py-2 rounded-md hover:bg-[#72CCD7] hover:border-transparent border border-[#8DE1FF] text-white hover:text-white bg-[#0A0F1E]">
                connect wallet
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
