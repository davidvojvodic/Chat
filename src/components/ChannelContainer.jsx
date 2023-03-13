import React from "react";
import {
  Channel,
  useChatContext,
  MessageTeam,
  MessageList,
} from "stream-chat-react";

import { ChannelInner, CreateChannel, EditChannel } from "./";

// The ChannelContainer component is responsible for rendering the channel window, and handling create/edit channel states.
const ChannelContainer = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
}) => {
  // Using `useChatContext` hook to extract `channel` data.
  const { channel } = useChatContext();

  // If state is creating a new channel, render the CreateChannel component.
  if (isCreating) {
    return (
      <div className="w-full h-full">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  // If editing an existing channel, render the EditChannel component.
  if (isEditing) {
    return (
      <div className="w-full h-full">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  // Empty state of the channel when there are no messages in it.
  const EmptyState = () => (
    <div className="flex h-full flex-col justify-end mx-[20px] pb-[20px]">
      <p className="font-roboto font-bold text-[18px] leading-[120%] text-[#2c2c30] mb-[10px]">
        This is the beginning of your chat history.
      </p>
      <p className="font-roboto text-[14px] leading-[120%] m-0 text-[#858688]">
        Send messages, attachments, links, emojis and more!
      </p>
    </div>
  );

  // Return the channel with its messages and inner components wrapped around the relevant context providers..etc.
  return (
    <div className="w-full h-full">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
