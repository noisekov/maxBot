import { useState } from "react";
import ChatList from "../../components/ChatList/ChatList";
import Chat from "../../components/Chat/Chat";
import NewChatModal from "../../components/NewChatModal/NewChatModal";
import type { Chat as ChatType } from "../../types/chat";
import styles from "./Messenger.module.css";
import { API_URL } from "../../services/greenApi";
import { useSelector } from "react-redux";
import { selectApiTokenInstance } from "../../slice/apiTokenInstanceSlice";
import { selectIdInstance } from "../../slice/idInstanceSlice";

interface MessengerProps {
  onLogout: () => void;
}

const Messenger = ({ onLogout }: MessengerProps) => {
  const apiTokenInstance = useSelector(selectApiTokenInstance);
  const idInstance = useSelector(selectIdInstance);

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

  const handleSendMessage = async (text: string) => {
    if (!activeChat) {
      return;
    }

    const response = await fetch(
      `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: activeChatId,
          message: text,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const { idMessage } = await response.json();

    const message = {
      id: idMessage,
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

  const handleCreateChat = async (phone: string) => {
    const responseChatID = await fetch(
      `${API_URL}/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: +phone,
        }),
      },
    );
    const { chatId } = await responseChatID.json();

    const newChat: ChatType = {
      id: chatId,
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
