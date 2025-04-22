"use client";
import ChatInput from "@/app/_components/(chat)/ChatInput";
import React, { useRef, useEffect } from "react";
import UserChatBox from "./UserChatBox";
import SystemChatBox from "./SystemChatBox";
import { useChatContext } from "../useChat";

const Page = () => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { messages, latestGeneratedAnswer } = useChatContext();

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, latestGeneratedAnswer]);


  return (
    <div className="w-full h-full flex flex-col relative">
      <div
        className="flex-1 overflow-y-auto w-full minimal-scrollbar"
      >
        <div className="flex justify-center w-full">
          <div className="w-full max-w-2xl px-4">
            {messages?.length > 0 ? (
              messages.map((message, index) => {
                return message.role === "user" ? (
                  <UserChatBox key={index} question={message.content} />
                ) : (
                  <SystemChatBox
                    key={index}
                    message={message.content}
                    // latestGeneratedAnswer={latestGeneratedAnswer}
                  />
                );
              })
            ) : (
              <></>
            )}
            {latestGeneratedAnswer && (
              <SystemChatBox
                key={crypto.randomUUID()}
                message={latestGeneratedAnswer}
              />
            )}

            <div ref={messagesContainerRef} />

          </div>
        </div>
      </div>
      <div className="sticky bottom-0 w-full pt-2 pb-4">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-2xl">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
