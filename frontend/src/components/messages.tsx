import { Message } from "./message";

type MessagesProps = {
  messages: { user: string; text: string }[];
  name: string;
};
export const Messages = ({ messages, name }: MessagesProps) => {
  console.log(messages);
  return (
    <div className="relative flex gap-2 pt-8 pb-20 overflow-y-scroll flex-col h-96 px-2 bg-zinc-50">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </div>
  );
};
