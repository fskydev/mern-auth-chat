import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!recipientUser)
    return (
      <p className="w-full text-center">Select a chat to start messaging</p>
    );

  if (isMessagesLoading)
    return <p className="w-full text-center">Loading Chat...</p>;

  return (
    <div className="flex h-[calc(100vh-10rem)] w-full flex-col gap-4 overflow-y-auto rounded-xl bg-[#191919]">
      <div className="flex flex-none items-center justify-center bg-[#1e1e1e] p-3">
        <strong>{recipientUser?.name}</strong>
      </div>
      <div className="flex max-h-[calc(100vh-15rem)] grow flex-col gap-3 overflow-y-auto px-8 py-0">
        {messages &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex max-w-[50%] grow-0 flex-col rounded-lg p-3 ${
                message?.senderId === user?._id
                  ? "self-end bg-[#00bd9b]"
                  : "self-start bg-[#282828]"
              }`}
              ref={scroll}
            >
              <span>{message.text}</span>
              <span className="content-end text-[0.75rem] font-normal">
                {moment(message.createdAt).calendar()}
              </span>
            </div>
          ))}
      </div>
      <div className="flex w-full flex-none items-center gap-3 bg-[#1e1e1e] p-4">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72,112,223,0.2)"
        />
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 bg-opacity-100"
          onClick={() =>
            sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
