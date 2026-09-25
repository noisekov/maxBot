import { type SubmitEvent, useState } from "react";
import styles from "./NewChatModal.module.css";

interface NewChatModalProps {
  onClose: () => void;
  onCreate: (phone: string) => void;
}

const NewChatModal = ({ onClose, onCreate }: NewChatModalProps) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const value = phone.replace(/\D/g, "");

    if (!value || value.length !== 11 || !value.startsWith("8")) {
      setError("Номер должен содержать 11 цифр и начинаться с 8");
      return;
    }

    setError("");
    onCreate(value);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setError("");
  };

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div
        className={styles.modal}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 className={styles.title}>Новый чат</h2>
        <p className={styles.description}>Введите номер телефона получателя</p>

        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="tel"
            placeholder="88005553535"
            value={phone}
            onChange={(event) => handlePhoneChange(event.target.value)}
            autoFocus
          />

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button
              className={`${styles["actions-cancel"]} ${styles.button}`}
              type="button"
              onClick={onClose}
            >
              Отмена
            </button>

            <button
              className={`${styles["actions-create"]} ${styles.button}`}
              type="submit"
              disabled={!phone.trim()}
            >
              Создать чат
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewChatModal;
