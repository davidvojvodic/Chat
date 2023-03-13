import React, { useState } from "react";
import {
  MessageList,
  MessageInput,
  Thread,
  Window,
  useChannelActionContext,
  Avatar,
  useChannelStateContext,
  useChatContext,
  useMessageContext,
} from "stream-chat-react";

import { ChannelInfo } from "../assets";

// create a new context to manage whether giphy is selected or not
export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing }) => {
  // establish a new state for our giphy selection
  const [giphyState, setGiphyState] = useState(false);

  // get the send message function from the current channel
  const { sendMessage } = useChannelActionContext();

  // override the submit handler and add giphy command text if necessary
  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }

    // send the message and reset the giphy selection state
    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  const CustomMessage = () => {
    const { message } = useMessageContext();
    const { client } = useChatContext();

    return (
      <div className="flex">
        {client.user.image}
        <b style={{ marginRight: "4px" }}>{message.user.name}</b> {message.text}
      </div>
    );
  };

  // return the chat interface with the giphy context provider
  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          background: "#313338",
        }}
      >
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />

          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

// define the header section for the team channel
const TeamChannelHeader = ({ setIsEditing }) => {
  // get the channel info and number of watchers from the channel state context
  const { channel, watcher_count } = useChannelStateContext();

  // get the chat client info from chat context
  const { client } = useChatContext();

  // define the messaging header which will display the avatars/names of the users in the chat
  const MessagingHeader = () => {
    // filter out the current user and map over the remaining members to display their info
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    const additionalMembers = members.length - 3;

    // if it's a messaging channel, display all members' info
    if (channel.type === "messaging") {
      return (
        <div className="flex-[3_3_0%] flex items-center overflow-auto max-w-[500px] whitespace-nowrap">
          {members.map(({ user }, i) => (
            <div key={i} className="flex items-center mr-2">
              <Avatar
                image={user.image}
                name={user.fullName || user.id}
                size={32}
              />
              <p className="font-[500] text-[14px]">
                {user.fullName || user.id}
              </p>
            </div>
          ))}

          {/* if there are additional members beyond what's displayed, show the count */}
          {additionalMembers > 0 && (
            <p className="font-[500] text-[14px]">
              and {additionalMembers} more
            </p>
          )}
        </div>
      );
    }

    // otherwise just display the channel name and editing icon
    return (
      <div className="flex-[3_3_0%] flex items-center overflow-auto max-w-[500px] whitespace-nowrap p-5">
        <p className="font-roboto font-bold text-[18px] text-white mr-2">
          # {channel.data.name}
        </p>
        <span style={{ display: "flex" }} onClick={() => setIsEditing(true)}>
          <ChannelInfo />
        </span>
      </div>
    );
  };

  // helper function to display the number of users online
  const getWatcherText = (watchers) => {
    if (!watchers) return "No users online";
    if (watchers === 1) return "1 user online";
    return `${watchers} users online`;
  };

  // return the overall header with both the messaging header and the watcher count
  return (
    <div className="h-[70px]">
      <MessagingHeader />
      <div className="flex flex-1 items-center justify-end text-right">
        <p className="font-roboto text-[14px] text-[#858688] mr-14">
          {getWatcherText(watcher_count)}
        </p>
      </div>
    </div>
  );
};

export default ChannelInner;
