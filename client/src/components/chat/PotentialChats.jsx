import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = ({ updateSelectedTabIndex }) => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  return (
    <>
      <div className="mb-4">
        {potentialChats && potentialChats.length > 0 ? (
          potentialChats.map((u, index) => {
            return (
              <div
                className="relative mb-2 mr-2 inline-block cursor-pointer rounded-md bg-teal-500 px-1.5 py-1 text-white"
                key={index}
                onClick={() => {
                  createChat(user._id, u._id);
                  updateSelectedTabIndex(0);
                }}
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
          })
        ) : (
          <>No new potential connections</>
        )}
      </div>
    </>
  );
};

export default PotentialChats;
