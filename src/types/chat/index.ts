export type Message = {
  role: "user" | "ai";
  content: string;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
};
