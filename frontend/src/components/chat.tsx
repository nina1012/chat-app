import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const Chat = () => {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

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

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
          placeholder="Enter your message"
        />
      </div>
    </div>
  );
};
