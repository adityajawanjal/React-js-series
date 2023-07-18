import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import ChatInfobar from "../components/ChatInfobar";
import ChatSection from "../components/ChatSection";
import ChatFooter from "../components/ChatFooter";
import { BASE_URL } from "../main";

let socket;
const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const endPoint = BASE_URL;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(endPoint);
    setName(name);
    setRoom(room);

    return () => {
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on("msg", (msg) => {
      setMessages([...messages, msg]);
      setMessage("");
    });
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", { name, room, message });
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col w-11/12 md:w-6/12 border-2 border-black h-5/6">
        <ChatInfobar room={room} />
        <ChatSection messages={messages} name={name} />
        <ChatFooter
          setMessage={setMessage}
          message={message}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
