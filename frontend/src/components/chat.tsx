import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const location = useLocation();
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name as string);
    setRoom(room as string);

    // Connect to the socket
    socket = io(ENDPOINT);
    console.log(socket);
  }, [location.search, ENDPOINT]);

  return (
    <div>
      <h2>Chat</h2>
    </div>
  );
};
