import React from "react";

const ChatFooter = ({ setMessage, message, handleSendMessage }) => {
  return (
    <div className=" border-t-2 border-black p-5 flex gap-5">
      <input
        type="text"
        placeholder="Type Message..."
        className=" px-4 py-2 h-14 w-full outline-none border-2 border-blue-400 rounded-3xl"
        onChange={(e) => setMessage(e.target.value)}
        value={message ? message : ""}
      />
      <button
        type="submit"
        className=" px-3 py-1 text-xl rounded-2xl w-32 bg-blue-300 hover:cursor-pointer hover:bg-green-300"
        onClick={handleSendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default ChatFooter;
