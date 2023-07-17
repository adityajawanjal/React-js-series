import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import ChatInfobar from "../components/ChatInfobar";
import ChatSection from "../components/ChatSection";
import ChatFooter from "../components/ChatFooter";

let socket;
const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const endPoint = `http://localhost:5000`;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(endPoint);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room });

    return () => {
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on(
      "message",
      (message) => {
        setMessages([...messages, message]);
      },
      [messages]
    );
  });

  const handleSendMessage = (e) =>{
    e.preventDefault();
    if(message){
        socket.emit('sendMessage',message);
        setMessage('');
        console.log(messages);
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col w-6/12 border-2 border-black h-5/6">
        <ChatInfobar room = {room} />
        <ChatSection/>
        <ChatFooter setMessage={setMessage} handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
