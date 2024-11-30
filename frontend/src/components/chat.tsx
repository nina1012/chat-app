import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const location = useLocation();
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room as string);
    setName(name as string);

    socket.emit("join", { name, room }, () => {
      console.log(`${name} has joined ${room}`);
    });
    socket.on("message", (message) => {
      console.log(message, " this message is from server");
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  return (
    <div>
      <h2>Chat</h2>
    </div>
  );
};
