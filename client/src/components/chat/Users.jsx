import { useState, useContext } from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import UserChat from "./UserChat";
import PotentialChats from "./PotentialChats";

const Users = () => {
  const { user } = useContext(AuthContext);
  const {
    currentChat,
    userChats,
    isUserChatsLoading,
    userChatsError,
    updateCurrentChat,
    potentialChats,
  } = useContext(ChatContext);

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div
      className={clsx("w-full sm:basis-1/4", currentChat && "hidden sm:block")}
    >
      <Tab.Group
        manual
        selectedIndex={selectedTabIndex}
        onChange={setSelectedTabIndex}
      >
        <Tab.List className="flex space-x-1 rounded-t-sm bg-zinc-700 p-1">
          <Tab
            className={({ selected }) =>
              clsx(
                "w-full whitespace-nowrap rounded-sm py-2.5 text-sm font-medium leading-4",
                selected
                  ? "bg-zinc-900/80 text-white"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
              )
            }
          >
            Friends
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                "w-full whitespace-nowrap rounded-sm py-2.5 text-sm font-medium leading-4",
                selected
                  ? "bg-zinc-900/80 text-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
              )
            }
          >
            Potential Chats(
            {potentialChats && potentialChats.length > 0
              ? potentialChats.length
              : 0}
            )
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="rounded-b-sm bg-zinc-900/50 p-3 focus:outline-none sm:max-h-[calc(80vh-2.8rem)] sm:overflow-y-auto">
            {userChats?.length < 1 ? null : (
              <div className="flex grow-0 flex-col gap-0">
                {isUserChatsLoading && <p>Loading chats...</p>}
                {userChats?.map((chat, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => updateCurrentChat(chat)}
                      className={clsx(
                        "border-b border-b-zinc-600 px-1.5 py-2 hover:bg-zinc-700/50",
                        currentChat &&
                          currentChat._id === chat._id &&
                          "bg-zinc-700",
                      )}
                    >
                      <UserChat chat={chat} user={user} />
                    </div>
                  );
                })}
              </div>
            )}
          </Tab.Panel>
          <Tab.Panel className="rounded-sm bg-zinc-900 p-3 focus:outline-none">
            <PotentialChats updateSelectedTabIndex={setSelectedTabIndex} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Users;
