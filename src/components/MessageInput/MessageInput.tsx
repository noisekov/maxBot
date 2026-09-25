import { useState, type SubmitEvent } from "react";
import styles from "./MessageInput.module.css";

interface MessageInputProps {
  onSend: (text: string) => void;
}

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const value = text.trim();

    if (!value) {
      return;
    }

    onSend(value);
    setText("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        placeholder="Написать сообщение..."
        onChange={(event) => setText(event.target.value)}
      />

      <button type="submit" disabled={!text.trim()}>
        ➤
      </button>
    </form>
  );
};

export default MessageInput;
