export const API_URL = import.meta.env.VITE_API_URL;

interface ReceiveNotificationResponse {
  receiptId: number;
  body: IncomingNotification;
}

export interface IncomingNotification {
  typeWebhook: string;
  instanceData: {
    idInstance: number;
    wid: string;
    typeInstance: string;
  };
  timestamp: number;
  idMessage: string;
  senderData: {
    chatId: string;
    chatName: string;
    chatType: string;
    sender: string;
    senderName: string;
    senderType: string;
    senderContactName: string;
    senderPhoneNumber: number;
  };
  messageData: {
    typeMessage: string;
    textMessageData?: {
      textMessage: string;
      isForwarded?: boolean;
      forwardingScore?: number;
    };
  };
}

const getCredentials = () => {
  const idInstance = localStorage.getItem("idInstance");
  const apiTokenInstance = localStorage.getItem("apiTokenInstance");

  if (!idInstance || !apiTokenInstance) {
    throw new Error("GREEN-API credentials not found");
  }

  return {
    idInstance,
    apiTokenInstance,
  };
};

export const receiveNotification =
  async (): Promise<ReceiveNotificationResponse | null> => {
    const { idInstance, apiTokenInstance } = getCredentials();

    const url =
      `${API_URL}/waInstance${idInstance}` +
      `/receiveNotification/${apiTokenInstance}` +
      "?receiveTimeout=60";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`ReceiveNotification error: ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
      return null;
    }

    return data;
  };

export const deleteNotification = async (receiptId: number) => {
  const { idInstance, apiTokenInstance } = getCredentials();

  const url =
    `${API_URL}/waInstance${idInstance}` +
    `/deleteNotification/${apiTokenInstance}/${receiptId}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`DeleteNotification error: ${response.status}`);
  }

  return response.json();
};
