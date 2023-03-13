import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";

import { UserList } from "./";
import { CloseCreateChannel } from "../assets";

// This component takes care of rendering the input field for channel name and add members for creating or editing a channel.
const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handleChange = (e) => {
    e.preventDefault();

    setChannelName(e.target.value);
  };

  // Returns the JSX for rendering the inputs along with labels and predefined CSS styles.
  return (
    <div className="flex flex-col h-[169px] pl-[20px] shadow-sm">
      <p className="font-roboto text-[16px] leading-[120%] text-[#2c2c30] mt-[30px] mb-4">
        Name
      </p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="channel-name"
        className="font-roboto text-[18px] text-[#00000080] h-[50px] w-[540px] bg-[#f7f6f8] border-1 border-[#0000001a] box-border rounded-lg pl-[16px] outline-none placeholder:font-[300]"
      />
      <p className="font-roboto text-[16px] leading-[120%] text-[#2c2c30] mt-[30px] mb-4">
        Add Members
      </p>
    </div>
  );
};

// This component renders the edit channel functionality using the stream-chat-react package. It includes an input field for changing the channel name and selecting the members to add.
const EditChannel = ({ setIsEditing }) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name); // Stores the current channel name in the state.
  const [selectedUsers, setSelectedUsers] = useState([]); // Stores the currently selected users in the state.

  const updateChannel = async (e) => {
    // Callback function for updating the channel.
    e.preventDefault();

    const nameChanged = channelName !== (channel.data.name || channel.data.id);

    if (nameChanged) {
      await channel.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` }
      );
    }

    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }

    setChannelName(null); // Resets the state for the channel name.
    setIsEditing(false);
    setSelectedUsers([]); // Resets the state for the selected users.
  };

  // Returns the JSX for rendering the component.
  return (
    <div className="flex flex-col h-full">
      {/* Renders the header section for edit channel */}
      <div className="flex items-center justify-between h-[62px] shadow-md pr-5">
        <p className="font-roboto font-bold text-[18px] leading-[22px] text-[#2c2c30] ml-5">
          Edit Channel
        </p>
        <div className="cursor-pointer">
          {/* Renders the close button */}
          <CloseCreateChannel setIsEditing={setIsEditing} />
        </div>
      </div>

      {/* Renders the input field for the channel name and add members */}
      <ChannelNameInput
        channelName={channelName}
        setChannelName={setChannelName}
      />

      {/* Renders the user list */}
      <UserList setSelectedUsers={setSelectedUsers} />

      {/* Renders the save button */}
      <div
        className="h-[82px] bg-[#f7f6f8] flex items-center justify-end rounded-xl"
        onClick={updateChannel}
      >
        <p className="bg-[#005fff] font-roboto font-bold text-[18px] px-5 py-2.5 text-white mr-8 rounded-lg cursor-pointer">
          Save Changes
        </p>
      </div>
    </div>
  );
};

export default EditChannel;
