import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  return (
    <>
      <div className="mb-4 flex">
        {potentialChats &&
          potentialChats.map((u, index) => {
            return (
              <div
                className="relative mr-2 cursor-pointer rounded-md bg-sky-400 px-1.5 py-1 text-white"
                key={index}
                onClick={() => createChat(user._id, u._id)}
              >
                {u.name}
                <span
                  className={
                    onlineUsers?.some((user) => user?.userId === u._id)
                      ? "user-online"
                      : ""
                  }
                ></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChats;
