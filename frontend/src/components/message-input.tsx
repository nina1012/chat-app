import { Send } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type InputProps = {
  message: string;
  setMessage: (e: Dispatch<SetStateAction<string>>) => void;
  sendMessage: (e) => void;
};

export const MessageInput = ({
  message,
  setMessage,
  sendMessage,
}: InputProps) => {
  return (
    <form className="flex bg-gray-50 pt-1 gap-1 h-14 absolute bottom-0 left-0 w-full">
      <input
        type="text"
        value={message}
        onChange={(e: ChangeEvent) => setMessage(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        placeholder="Type a message..."
        className="p-4 w-full text-lg border-0 focus:ring-1 focus:ring-pink-100"
      />
      <button
        className="
      text-white bg-pink-500 w-16 rounded-md p-2 flex items-center justify-center border-none"
        onClick={(e) => sendMessage(e)}
      >
        <Send />
      </button>
    </form>
  );
};
