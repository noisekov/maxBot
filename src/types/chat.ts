export interface Message {
  id: string;
  text: string;
  fromMe: boolean;
  timestamp: number;
}

export interface Chat {
  id: string;
  phone: string;
  name: string;
  messages: Message[];
}
