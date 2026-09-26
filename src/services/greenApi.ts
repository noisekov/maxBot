import type { CredentialsState } from "../slice/credentialsSlice";
export const API_URL = import.meta.env.VITE_API_URL;
export type Credentials = CredentialsState;

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

const buildUrl = (idInstance: string, path: string) =>
  `${API_URL}/waInstance${idInstance}/${path}`;

export async function receiveNotification({
  idInstance,
  apiTokenInstance,
}: Credentials): Promise<ReceiveNotificationResponse | null> {
  const response = await fetch(
    buildUrl(idInstance, `receiveNotification/${apiTokenInstance}`) +
      "?receiveTimeout=60",
  );

  if (!response.ok) {
    throw new Error(`ReceiveNotification error: ${response.status}`);
  }

  const data = await response.json();
  return data || null;
}

export async function deleteNotification(
  { idInstance, apiTokenInstance }: Credentials,
  receiptId: number,
) {
  const response = await fetch(
    buildUrl(idInstance, `deleteNotification/${apiTokenInstance}/${receiptId}`),
    { method: "DELETE" },
  );

  if (!response.ok) {
    throw new Error(`DeleteNotification error: ${response.status}`);
  }

  return response.json();
}
