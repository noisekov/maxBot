import type { Message as MessageType } from "../../types/chat";
import styles from "./Message.module.css";

interface MessageProps {
  message: MessageType;
}

const Message = ({ message }: MessageProps) => {
  return (
    <div
      className={`${styles.message} ${
        message.fromMe ? styles.myMessage : styles.otherMessage
      }`}
    >
      <div className={styles.text}>{message.text}</div>

      <div className={styles.time}>
        {new Date(message.timestamp).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export default Message;
