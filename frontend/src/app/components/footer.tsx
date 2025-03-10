import Image from "next/image";
import XIcon from "../svg/x-icon";
import TelegramIcon from "../svg/telegram-icon";
import footerLogo from "../../../public/footer-logo.svg";
import Link from "next/link";


export default function Footer(){
    return (
      <footer className=" mt-9 text-[#FFFFFF] w-full bottom-0 flex justify-between sm:flex-row flex-col sm:items-center border border-[#8DE1FF] rounded-md py-4 p-4">
        <div className="flex gap-x-4 items-center sm:flex-row flex-col">
          <Image
            src={footerLogo}
            alt="ai-one"
            className="w-24 h-fit"
            priority
          />
          <h4>All right reserved @2025</h4>
        </div>
        <ul className="flex justify-between gap-x-4 items-start sm:items-center capitalize sm:flex-row flex-col">
          <li>Terms and Condition </li>
          <li>
            <Link href="https://github.com/Web3Novalabs/aione" target="_blank">
              github
            </Link>
          </li>
          <li>
            <Link href="https://aione-6m73.vercel.app/#/" target="_blank">
              Doc
            </Link>
          </li>
          <div className="flex gap-4">
            <Link href="https://x.com/aione_novalabs" target="_blank">
              <XIcon />
            </Link>
            <Link href="#" target="_blank">
              <TelegramIcon />
            </Link>
          </div>
        </ul>
      </footer>
    );
}