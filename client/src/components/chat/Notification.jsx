import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import moment from "moment";
import clsx from "clsx";
import { Popover } from "@headlessui/react";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid";

const Notification = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationsAsRead,
    markNotificationAsRead,
  } = useContext(ChatContext);

  const unreadNotifications = unreadNotificationsFunc(notifications);
  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId);

    return {
      ...n,
      senderName: sender?.name,
    };
  });

  return (
    <>
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={clsx(
                "relative py-2 focus:outline-none",
                open ? "opacity-90" : "opacity-100",
              )}
            >
              <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-white" />
              {unreadNotifications?.length > 0 && (
                <span className="absolute -right-1 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-xs font-medium">
                  <span>{unreadNotifications?.length}</span>
                </span>
              )}
            </Popover.Button>

            <Popover.Panel className="absolute right-0 z-10 mt-1 w-[calc(100vw-3.5rem)] sm:w-80">
              <div className="overflow-hidden bg-zinc-900">
                <div className="flex justify-between p-4">
                  <span className="flex items-center">
                    <span className="text-lg font-bold text-white">
                      Notifications
                    </span>
                  </span>
                  <span
                    className="block cursor-pointer text-sm font-bold text-zinc-400 hover:opacity-90"
                    onClick={() => markAllNotificationsAsRead(notifications)}
                  >
                    Mark all as read
                  </span>
                </div>
                {modifiedNotifications?.length === 0 && (
                  <span className="block border-b border-zinc-500 px-4 py-2 text-sm text-zinc-400">
                    No notification yet...
                  </span>
                )}
                <div className="relative flex flex-col gap-2 pb-2">
                  {modifiedNotifications &&
                    modifiedNotifications.map((n, index) => (
                      <div
                        key={index}
                        className={clsx(
                          "flex cursor-pointer flex-col border-b border-zinc-500 px-4 py-2 text-sm hover:opacity-90",
                          n.isRead ? "bg-zinc-900" : "bg-zinc-700",
                        )}
                        onClick={() => {
                          close();
                          navigate("/");
                          markNotificationAsRead(
                            n,
                            userChats,
                            user,
                            notifications,
                          );
                        }}
                      >
                        <span className="text-white">
                          {`${n.senderName} sent you a new message`}
                        </span>
                        <span className="text-zinc-400">
                          {moment(n.date).calendar()}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
};

export default Notification;
