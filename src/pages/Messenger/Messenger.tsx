import { useState } from "react";
import ChatList from "../../components/ChatList/ChatList";
import Chat from "../../components/Chat/Chat";
import NewChatModal from "../../components/NewChatModal/NewChatModal";
import type { Chat as ChatType } from "../../types/chat";
import styles from "./Messenger.module.css";

interface MessengerProps {
  onLogout: () => void;
}

const Messenger = ({ onLogout }: MessengerProps) => {
  const [chats, setChats] = useState<ChatType[]>(() => {
    const TIMESTAMP_ONE_MINUTE_AGO = Date.now() - 60_000;
    const TIMESTAMP_30_SECONDS_AGO = Date.now() - 30_000;

    return [
      {
        id: "1",
        phone: "79991234567",
        name: "Алексей",
        messages: [
          {
            id: "1",
            text: "Привет! Как дела?",
            fromMe: false,
            timestamp: TIMESTAMP_ONE_MINUTE_AGO,
          },
          {
            id: "2",
            text: "Привет! Всё отлично, спасибо!",
            fromMe: true,
            timestamp: TIMESTAMP_30_SECONDS_AGO,
          },
        ],
      },
    ];
  });

  const [activeChatId, setActiveChatId] = useState("1");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const handleSendMessage = (text: string) => {
    if (!activeChat) {
      return;
    }

    const message = {
      id: crypto.randomUUID(),
      text,
      fromMe: true,
      timestamp: Date.now(),
    };

    setChats((currentChats) =>
      currentChats.map((chat) =>
        chat.id === activeChat.id
          ? {
              ...chat,
              messages: [...chat.messages, message],
            }
          : chat,
      ),
    );
  };

  const handleCreateChat = (phone: string) => {
    const newChat: ChatType = {
      id: crypto.randomUUID(),
      phone,
      name: phone,
      messages: [],
    };

    setChats((currentChats) => [...currentChats, newChat]);
    setActiveChatId(newChat.id);
    setIsNewChatOpen(false);
  };

  return (
    <div className={styles.messenger}>
      <ChatList
        chats={chats}
        activeChatId={activeChatId}
        onChatSelect={setActiveChatId}
        onNewChat={() => setIsNewChatOpen(true)}
        onLogout={onLogout}
      />

      {activeChat ? (
        <Chat chat={activeChat} onSendMessage={handleSendMessage} />
      ) : (
        <div className={styles.empty}>
          <h2 className={styles.emptyTitle}>Выберите чат</h2>

          <p className={styles.emptyText}>Или создайте новый чат</p>
        </div>
      )}

      {isNewChatOpen && (
        <NewChatModal
          onClose={() => setIsNewChatOpen(false)}
          onCreate={handleCreateChat}
        />
      )}
    </div>
  );
};

export default Messenger;
