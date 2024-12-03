import queryString from "query-string";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { io, Socket } from "socket.io-client";
import { MessageInput } from "./message-input";
import { ChatBar } from "./chat-bar";
import { Messages } from "./messages";

let socket: Socket;

export const Chat = () => {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );

  const location = useLocation();
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room as string);
    setName(name as string);

    socket.emit("join", { name, room }, () => {
      // console.log(`${name} has joined ${room}`);
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="relative bg-pink-50 min-h-screen w-full flex justify-center items-center text-center">
      <Link to="/" className="top-0 absolute">
        Home
      </Link>
      <div className="relative z-0 max-w-sm bg-transparent rounded w-full [&>div]:border-pink-100 [&>div]:focus:ring-1 [&>div]:focus:ring-pink-400 [&>div]:rounded min-h-96  !backdrop-brightness-10 [&>div]:px-2 [&>div]:w-full">
        <ChatBar room={room} />
        <Messages messages={messages} name={name} />
        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};
