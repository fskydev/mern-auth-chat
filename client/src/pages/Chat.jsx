import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } =
    useContext(ChatContext);

  return (
    <div className="p-2.5">
      <PotentialChats />
      {userChats?.length < 1 ? null : (
        <div className="flex flex-col items-start gap-4 sm:flex-row">
          <div className="flex grow-0 flex-col gap-3 pr-3">
            {isUserChatsLoading && <p>Loading chats...</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </div>
          <ChatBox />
        </div>
      )}
    </div>
  );
};

export default Chat;
