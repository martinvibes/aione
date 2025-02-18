"use client";
import { useContext } from "react";
import { MessageSquare } from "lucide-react";
import { ChatContext } from "../../useContext/chatContex";
import Swap from "../../svg/swap";
import SideNavBar from "./components/side-bar";
import ChatInput from "./components/chat-input";
import { Chatpage } from "./components/chat-page";
import NewChat from "../../svg/new-chat-icon";
import AsideIcon from "../../svg/aside-icon";
import History from "./components/history";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useParams } from "next/navigation";
import Link from "next/link";

const Chat = () => {
  const { chatType, setIsHistoryOpen } = useContext(ChatContext);
  const params = useParams();
  const chatId = params.chatid as string;

  const { getMessagesFromStorage } = useLocalStorage(chatId);

  const messages = getMessagesFromStorage();
  function historyOpenHandle() {
    setIsHistoryOpen((prev) => !prev);
  }

  return (
    <main className="bg-mainChatbg min-h-screen max-h-full text-whiteChatText flex overflow-hidden">
      <SideNavBar />
      <section className="w-full max-h-screen min-h-full p-6 relative max-w-7xl mx-auto">
        <header className="flex gap-4 mb-2">
          <button
            className={`${
              chatType === "ai-chat" ? "bg-aqwaGreen" : "bg-inherit"
            } p-4 flex justify-between items-center w-fit rounded-[8px] transition-all duration-500 border-[#F7F9FC] border`}
            type="button"
          >
            <MessageSquare />
          </button>
          <button
            className={`${
              chatType === "swap" ? "bg-aqwaGreen" : "bg-inherit"
            } p-4 flex justify-between items-center w-fit rounded-[8px] transition-all duration-500 border-[#F7F9FC] border`}
            type="button"
          >
            <Swap />
          </button>
        </header>
        <div className=" h-[92%] flex gap-1 rounded-[8px]">
          <div
            className={`${
              messages.length ? "bg-[#141A2A]" : "bg-inherit"
            } w-full items-center h-full justify-center flex flex-col gap-2 rounded-[8px]`}
          >
            {messages.length > 0 && (
              <div className="flex justify-between items-center w-full max-w-7xl border-b-[#D6F3F7] border-b p-4">
                <h2>AI CHAT</h2>
                <div className="flex items-center gap-5">
                  <Link href={`/chat/${Date.now().toString()}`}>
                    <NewChat />
                  </Link>
                  <span onClick={historyOpenHandle}>
                    <AsideIcon />
                  </span>
                </div>
              </div>
            )}
            {messages.length > 0 && <Chatpage />}
            <ChatInput />
          </div>
          <History />
        </div>
      </section>
    </main>
  );
};
export default Chat;


// //mod strings;
// mod float;
// mod signed;
// mod string;
// mod unsigned;

// #[derive(Debug)]
// struct User {
//     id: u128,
//     name: String,
//     gender: Sex,
//     marital_status: Status,
// }

// #[derive(Debug)]
// enum Status {
//     Married,
//     Single,
//     Divorce,
//     Widow,
// }

// #[derive(Debug)]
// enum Sex {
//     Male,
//     Female,
// }

// fn convert_usize_to_u128(len: usize) -> u128 {
//     len as u128
// }

// fn user_checker(users_data: &mut Vec<User>, id: u128) -> Option<&mut User> {
//     users_data.iter_mut().find(|x| x.id == id)
// }

// impl User {
//     fn new_user(users_data: &Vec<User>, name: String, gender: Sex, marital_status: Status) -> User {
//         User {
//             id: convert_usize_to_u128(users_data.len()) + 1,
//             name,
//             gender,
//             marital_status,
//         }
//     }

//     fn update_user_name(name: String, users_data: &mut Vec<User>, id: u128) {
//         // let updated_name = users_data.iter_mut().find(|x| x.id == id ).expect("invalid user id");
//         let updated_name = user_checker(users_data, id);

//         match updated_name {
//             Some(user) => user.name = name,
//             _ => println!("user with id {} does not exist", id),
//         }
//     }
//     fn update_user_sex(gender: Sex, users_data: &mut Vec<User>, id: u128) {
//         let updated_sex = user_checker(users_data, id);

//         match updated_sex {
//             Some(user) => user.gender = gender,
//             _ => println!("user with id {} does not exist", id),
//         }
//     }
//     fn update_user_marital_status(status: Status, users_data: &mut Vec<User>, id: u128) {
//         let updated_status = user_checker(users_data, id);

//         match updated_status {
//             Some(user) => user.marital_status = status,
//             _ => println!("user with id {} does not exist", id),
//         }
//     }
// }

// fn main() {
//        unsigned::intro_to_u();
//     signed::intro_to_i();
//     float::intro_to_float();
//     string::strings();
//     let mut users_data: Vec<User> = Vec::new();
//     users_data.push(User::new_user(
//         &users_data,
//         "yunus".to_string(),
//         Sex::Male,
//         Status::Single,
//     ));
//     users_data.push(User::new_user(
//         &users_data,
//         "Titilola".to_string(),
//         Sex::Female,
//         Status::Divorce,
//     ));
//     users_data.push(User::new_user(
//         &users_data,
//         "yunus".to_string(),
//         Sex::Male,
//         Status::Married,
//     ));
//     users_data.push(User::new_user(
//         &users_data,
//         "funke".to_string(),
//         Sex::Female,
//         Status::Widow,
//     ));

//     User::update_user_name("Iliya".to_string(), &mut users_data, 5);
//     User::update_user_marital_status(Status::Married, &mut users_data, 344);
//     User::update_user_sex(Sex::Female, &mut users_data, 3);
//     User::update_user_name("kemi".to_string(), &mut users_data, 2);

//     //User::update_user_name(&mut user_one, "Abdul".to_string());
//     println!("user {:#?}", users_data);
// }
