import Users from "../components/chat/Users";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  return (
    <div className="p-2.5">
      <div className="flex flex-col items-start gap-2 sm:flex-row">
        <Users />
        <ChatBox />
      </div>
    </div>
  );
};

export default Chat;
