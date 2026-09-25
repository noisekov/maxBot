import { type SubmitEvent, useState } from "react";
import styles from "./NewChatModal.module.css";

interface NewChatModalProps {
  onClose: () => void;
  onCreate: (phone: string) => void;
}

const NewChatModal = ({ onClose, onCreate }: NewChatModalProps) => {
  const [phone, setPhone] = useState("");

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const value = phone.replace(/\D/g, "");

    if (!value) {
      return;
    }

    onCreate(value);
  };

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div
        className={styles.modal}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2>Новый чат</h2>

        <p>Введите номер телефона получателя</p>

        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="79991234567"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            autoFocus
          />

          <div className={styles.actions}>
            <button type="button" onClick={onClose}>
              Отмена
            </button>

            <button type="submit" disabled={!phone.trim()}>
              Создать чат
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewChatModal;
