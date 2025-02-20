import Image from "next/image";
import XIcon from "../svg/x-icon";
import TelegramIcon from "../svg/telegram-icon";
import footerLogo from "../../../public/footer-logo.svg";
import Link from "next/link";


export default function Footer(){
    return (
      <footer className=" mt-9 text-[#FFFFFF] w-full bottom-0 flex justify-between sm:flex-row flex-col items-center border border-[#8DE1FF] rounded-md py-4 p-4">
        <div className="flex gap-x-4 items-center sm:flex-row flex-col">
          <Image
            src={footerLogo}
            alt="ai-one"
            className="w-24 h-fit"
            priority
          />
          <h4>All right reserved @2025</h4>
        </div>
        <ul className="flex justify-between gap-x-4 items-center capitalize sm:flex-row flex-col">
          <li>Terms and Condition </li>
          <li>
            <Link href="">github</Link>
          </li>
          <li>
            <Link href="">doc</Link>
          </li>
          <li>
            <XIcon />
          </li>
          <li>
            <TelegramIcon/>
          </li>
        </ul>
      </footer>
    );
}