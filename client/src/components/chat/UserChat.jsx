import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import avatar from "../../assets/avatar.svg";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
    useContext(ChatContext);

  const { latestMessage } = useFetchLatestMessage(chat);

  const unreadNotifications = unreadNotificationsFunc(notifications);

  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId === recipientUser?._id,
  );

  const isOnline = onlineUsers?.some((u) => u?.userId === recipientUser?._id);

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText = shortText + "...";
    }

    return shortText;
  };

  return (
    <div
      className="relative flex cursor-pointer items-center justify-between gap-1"
      onClick={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <div className="flex basis-3/5">
        <div className="mr-2">
          <img src={avatar} className="h-10 w-10" />
        </div>
        <div>
          <div className="font-bold">{recipientUser?.name}</div>
          <div className="text-sm text-gray-400">
            {latestMessage?.text && (
              <span>{truncateText(latestMessage?.text)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex basis-2/5 flex-col items-end py-2">
        <div className="text-right text-sm text-gray-400">
          {moment(latestMessage?.createdAt).calendar()}
        </div>
        <div
          className={
            thisUserNotifications?.length > 0
              ? "flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-[0.75rem] font-bold"
              : ""
          }
        >
          {thisUserNotifications?.length > 0
            ? thisUserNotifications?.length
            : ""}
        </div>
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </div>
  );
};

export default UserChat;
