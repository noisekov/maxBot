import type { Chat as ChatType } from "../../types/chat";
import ChatHeader from "../ChatHeader/ChatHeader";
import Message from "../Message/Message";
import MessageInput from "../MessageInput/MessageInput";
import styles from "./Chat.module.css";

interface ChatProps {
  chat: ChatType;
  onSendMessage: (text: string) => void;
}

const Chat = ({ chat, onSendMessage }: ChatProps) => {
  return (
    <section className={styles.chat}>
      <ChatHeader chat={chat} />

      <div className={styles.messages}>
        {chat.messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <MessageInput onSend={onSendMessage} />
    </section>
  );
};

export default Chat;
