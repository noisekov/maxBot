import type { Chat } from "../../types/chat";
import styles from "./ChatListItem.module.css";

interface ChatListItemProps {
  chat: Chat;
  active: boolean;
  onClick: () => void;
}

const ChatListItem = ({ chat, active, onClick }: ChatListItemProps) => {
  const lastMessage = chat.messages.at(-1);

  return (
    <button
      className={`${styles.item} ${active ? styles.active : ""}`}
      type="button"
      onClick={onClick}
    >
      <div className={styles.avatar}>{chat.name.charAt(0).toUpperCase()}</div>

      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.name}>{chat.name}</span>

          {lastMessage && (
            <span className={styles.time}>
              {new Date(lastMessage.timestamp).toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>

        <div className={styles.preview}>
          {lastMessage?.text || "Нет сообщений"}
        </div>
      </div>
    </button>
  );
};

export default ChatListItem;
