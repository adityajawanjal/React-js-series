import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !room) {
      alert("Enter Name or Room !");
      return;
    }
    navigate(`/chat?name=${name}&room=${room}`);
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="p-5 border-2 border-black rounded-3xl w-11/12 md:w-6/12 h-auto flex flex-col items-center gap-5">
        <h2 className=" text-center text-5xl mb-10 italic text-red-400">
          Join Chat
        </h2>
        <input
          type="text"
          placeholder="Enter your Name..."
          className=" px-4 py-2 rounded-full outline-none border-2 border-blue-400 w-72 sm:w-96"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Room..."
          className=" px-4 py-2 rounded-full outline-none border-2 border-blue-400 w-72 sm:w-96"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button
          type="submit"
          className=" px-10 py-3 text-xl sm:text-2xl rounded-full bg-blue-300 hover:cursor-pointer hover:bg-green-300"
          onClick={handleSubmit}
        >
          Join Chat
        </button>
      </div>
    </div>
  );
};

export default Join;
