import { useState } from "react";
import type { Chat } from "../../types/chat";
import ChatListItem from "../ChatListItem/ChatListItem";
import styles from "./ChatList.module.css";

interface ChatListProps {
  chats: Chat[];
  activeChatId: string;
  onChatSelect: (id: string) => void;
  onNewChat: () => void;
  onLogout: () => void;
}

const ChatList = ({
  chats,
  activeChatId,
  onChatSelect,
  onNewChat,
  onLogout,
}: ChatListProps) => {
  const [search, setSearch] = useState("");

  const filteredChats = chats.filter((chat) =>
    `${chat.name} ${chat.phone}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h1 className={styles.logo}>MAX</h1>

        <button
          className={styles.newChat}
          type="button"
          onClick={onNewChat}
          aria-label="Создать новый чат"
        >
          +
        </button>
      </div>

      <div className={styles.search}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Поиск"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className={styles.title}>Чаты</div>

      <div className={styles.list}>
        {filteredChats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            active={chat.id === activeChatId}
            onClick={() => onChatSelect(chat.id)}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <button className={styles.logout} type="button" onClick={onLogout}>
          Выйти
        </button>
      </div>
    </aside>
  );
};

export default ChatList;
