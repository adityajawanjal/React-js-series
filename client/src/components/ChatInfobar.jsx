import React from "react";

const ChatInfobar = ({room}) => {
  return (
    <div className=" bg-gray-300 h-1/6 flex justify-center items-center text-lg md:text-3xl text-red-500 border-b-2 border-black">
      Room Name :<span className=" text-black">{`- ${room}`}</span>
    </div>
  );
};

export default ChatInfobar;
