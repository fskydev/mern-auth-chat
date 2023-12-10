import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import {
  ArrowLongLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { toast } from "react-toastify";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const {
    currentChat,
    updateCurrentChat,
    messages,
    isMessagesLoading,
    sendTextMessage,
  } = useContext(ChatContext);
  const { recipientUser, error: recipientUserFetchError } =
    useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    if (!recipientUser && recipientUserFetchError?.error) {
      toast.error(recipientUserFetchError.message);
    }
  }, [recipientUser, recipientUserFetchError]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!recipientUser || !currentChat)
    return (
      <div className="mt-5 w-full text-center sm:basis-3/4">
        <span className="rounded-full bg-zinc-900/50 px-4 py-1.5">
          Select a chat to start messaging
        </span>
      </div>
    );

  if (isMessagesLoading)
    return <p className="w-full text-center sm:basis-3/4">Loading Chat...</p>;

  return (
    <div
      className={clsx(
        "flex h-[calc(100vh-5.25rem)] w-full flex-col gap-4 overflow-y-auto bg-zinc-900/50 sm:h-[80vh] sm:basis-3/4",
        currentChat ? "" : "hidden sm:flex",
      )}
    >
      <div className="flex flex-none items-center justify-between bg-zinc-700 p-1">
        <button
          className="flex-none sm:hidden"
          onClick={() => {
            updateCurrentChat(null);
          }}
        >
          <ArrowLongLeftIcon className="h-5 w-5 text-white" />
        </button>
        <strong className="flex-1 p-2.5 text-center leading-4">
          {recipientUser?.name}
        </strong>
      </div>
      <div className="flex grow flex-col gap-3 overflow-y-auto px-3 py-0">
        {messages &&
          messages.map((message, index) => (
            <div
              key={index}
              className={clsx(
                "flex max-w-[50%] grow-0 flex-col rounded-sm p-3",
                message?.senderId === user?._id
                  ? "self-end bg-zinc-700"
                  : "self-start bg-zinc-800",
              )}
              ref={scroll}
            >
              <span>{message.text}</span>
              <span className="content-end text-[0.75rem] font-normal">
                {moment(message.createdAt).calendar()}
              </span>
            </div>
          ))}
      </div>
      <div className="flex w-full items-center justify-between gap-2 bg-zinc-700 p-3">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderRadius={2}
        />
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 hover:bg-teal-400"
          onClick={() =>
            sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
          }
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
