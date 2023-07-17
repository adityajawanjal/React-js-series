import React from "react";

const ChatSection = ({ messages, name }) => {
  console.log(messages);

  return (
    <div className=" h-4/6 overflow-y-auto flex flex-col">
      {messages?.map((e, i) => {
        return (
          <div
            key={i}
            className={`m-2 px-4 py-2 border-2 rounded-full bg-blue-200 w-fit max-w-md  ${
              e.user === name ? "self-end" : "self-start"
            }  `}
          >
            <span className=" text-xs mr-1 font-bold block">
              {e.user !== name ? e.user : ""}
            </span>
            <span>{e.message}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatSection;
