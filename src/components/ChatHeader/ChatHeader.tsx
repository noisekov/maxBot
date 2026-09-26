import type { Chat } from "../../types/chat";
import styles from "./ChatHeader.module.css";

interface ChatHeaderProps {
  chat: Chat;
  onBack: () => void;
}

const ChatHeader = ({ chat, onBack }: ChatHeaderProps) => {
  return (
    <header className={styles.header}>
      <button
        className={styles.back}
        type="button"
        onClick={onBack}
        aria-label="Вернуться к чатам"
      >
        ←
      </button>

      <div className={styles.avatar}>{chat.name.charAt(0).toUpperCase()}</div>

      <div className={styles.info}>
        <div className={styles.name}>{chat.name}</div>

        <div className={styles.phone}>{chat.phone}</div>
      </div>
    </header>
  );
};

export default ChatHeader;
