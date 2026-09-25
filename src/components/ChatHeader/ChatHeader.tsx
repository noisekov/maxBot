import type { Chat } from "../../types/chat";

import styles from "./ChatHeader.module.css";

interface ChatHeaderProps {
  chat: Chat;
}

const ChatHeader = ({ chat }: ChatHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.avatar}>
        {chat.name.charAt(0).toUpperCase()}
      </div>

      <div>
        <div className={styles.name}>{chat.name}</div>
        <div className={styles.phone}>{chat.phone}</div>
      </div>
    </header>
  );
};

export default ChatHeader;