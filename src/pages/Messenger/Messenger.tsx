import { useEffect, useState } from "react";
import ChatList from "../../components/ChatList/ChatList";
import Chat from "../../components/Chat/Chat";
import NewChatModal from "../../components/NewChatModal/NewChatModal";
import {
  API_URL,
  deleteNotification,
  receiveNotification,
} from "../../services/greenApi";
import type { Chat as ChatType } from "../../types/chat";
import styles from "./Messenger.module.css";
import { useSelector } from "react-redux";
import { selectCredentials } from "../../slice/credentialsSlice";

interface MessengerProps {
  onLogout: () => void;
}

const Messenger = ({ onLogout }: MessengerProps) => {
  const { idInstance, apiTokenInstance } = useSelector(selectCredentials);
  const [chats, setChats] = useState<ChatType[]>([]);
  const [activeChatId, setActiveChatId] = useState("");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const activeChat = chats.find((chat) => chat.id === activeChatId);

  useEffect(() => {
    let stopped = false;

    const receiveMessages = async () => {
      while (!stopped) {
        try {
          const notification = await receiveNotification({
            idInstance,
            apiTokenInstance,
          });

          if (stopped) {
            break;
          }

          if (!notification) {
            continue;
          }

          const { receiptId, body } = notification;

          const isIncomingTextMessage =
            body.typeWebhook === "incomingMessageReceived" &&
            body.messageData.typeMessage === "textMessage" &&
            Boolean(body.messageData.textMessageData?.textMessage);

          if (isIncomingTextMessage) {
            const text = body.messageData.textMessageData!.textMessage;
            const phone = String(body.senderData.senderPhoneNumber);

            const MILLIS_TO_SECONDS = 1000;
            const message = {
              id: body.idMessage,
              text,
              fromMe: false,
              timestamp: body.timestamp * MILLIS_TO_SECONDS,
            };
            const chatId = body.senderData.chatId;

            setChats((currentChats) => {
              const chatExists = currentChats.some(
                (chat) => chat.phone === phone,
              );

              if (!chatExists) {
                return [
                  ...currentChats,
                  {
                    id: chatId,
                    phone,
                    name: body.senderData.senderName || phone,
                    messages: [message],
                  },
                ];
              }

              return currentChats.map((chat) =>
                chat.phone === phone
                  ? {
                      ...chat,
                      name: body.senderData.senderName || chat.name,
                      messages: [...chat.messages, message],
                    }
                  : chat,
              );
            });

            setActiveChatId(chatId);
          }

          await deleteNotification(
            {
              idInstance,
              apiTokenInstance,
            },
            receiptId,
          );
        } catch (error) {
          if (stopped) {
            break;
          }

          console.error("GREEN-API receiving error:", error);

          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }
    };

    receiveMessages();

    return () => {
      stopped = true;
    };
  }, [idInstance, apiTokenInstance]);

  const handleSendMessage = async (text: string) => {
    if (!activeChat) {
      return;
    }

    const url = `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: activeChat.id,
        message: text,
      }),
    });

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
    const existingChat = chats.find((chat) => chat.phone === phone);

    if (existingChat) {
      setActiveChatId(existingChat.id);
      setIsNewChatOpen(false);
      return;
    }

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

    if (!responseChatID.ok) {
      throw new Error("Failed to check account");
    }

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

  const handleBackToChats = () => {
    setActiveChatId("");
  };

  return (
    <div className={styles.messenger}>
      <div
        className={`${styles.chatListWrapper} ${
          activeChat ? styles.chatListHidden : ""
        }`}
      >
        <ChatList
          chats={chats}
          activeChatId={activeChatId}
          onChatSelect={setActiveChatId}
          onNewChat={() => setIsNewChatOpen(true)}
          onLogout={onLogout}
        />
      </div>

      <div
        className={`${styles.chatWrapper} ${
          activeChat ? styles.chatVisible : ""
        }`}
      >
        {activeChat ? (
          <Chat
            chat={activeChat}
            onSendMessage={handleSendMessage}
            onBack={handleBackToChats}
          />
        ) : (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>Выберите чат</h2>

            <p className={styles.emptyText}>Или создайте новый чат</p>
          </div>
        )}
      </div>

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
