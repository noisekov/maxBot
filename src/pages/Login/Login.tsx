import { useState, type SubmitEvent } from "react";
import styles from "./Login.module.css";

interface LoginProps {
  onLogin: (idInstance: string, apiTokenInstance: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const instance = idInstance.trim();
    const token = apiTokenInstance.trim();

    if (!instance || !token) {
      return;
    }

    onLogin(instance, token);
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>M</div>

        <h1 className={styles.title}>MAX</h1>

        <p className={styles.description}>Войдите с помощью данных GREEN-API</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>idInstance</span>

            <input
              className={styles.input}
              type="text"
              value={idInstance}
              placeholder="Введите idInstance"
              onChange={(event) => setIdInstance(event.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>apiTokenInstance</span>

            <input
              className={styles.input}
              type="password"
              value={apiTokenInstance}
              placeholder="Введите apiTokenInstance"
              onChange={(event) => setApiTokenInstance(event.target.value)}
            />
          </label>

          <button
            className={styles.submit}
            type="submit"
            disabled={!idInstance.trim() || !apiTokenInstance.trim()}
          >
            Войти
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
