// Import required modules and components
import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { UserList } from "./";
import { CloseCreateChannel } from "../assets";

// ChannelNameInput Component - takes input of channel name from user
const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  // Handle change in the input value
  const handleChange = (e) => {
    e.preventDefault();

    setChannelName(e.target.value);
  };

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

// CreateChannel Component - Creates a new channel or message group depending on the type passed to it
const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const [channelName, setChannelName] = useState("");

  // Sends request to create a new channel or message group/channel
  const createChannel = async (e) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });

      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-[62px] shadow-sm pr-[20px]">
        <p className="font-roboto font-bold text-[18px] leading-[22px] text-[#2c2c30] ml-[20px]">
          {createType === "team"
            ? "Create a New Channel"
            : "Send a Direct Message"}
        </p>
        <div className="cursor-pointer">
          <CloseCreateChannel setIsCreating={setIsCreating} />
        </div>
      </div>

      {/* // If createType is a team show input field for channel name */}
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}

      {/* // Show list of users available for selection */}
      <UserList setSelectedUsers={setSelectedUsers} />

      {/* // Button to create the channel */}
      <div
        className="h-[82px] bg-[#f7f7f8] flex items-center justify-end px-4 rounded-xl"
        onClick={createChannel}
      >
        <p className="bg-[#005fff] font-roboto font-bold text-[18px] py-3 px-6 text-white rounded-lg cursor-pointer">
          {createType === "team" ? "Create Channel" : "Create Message Group"}
        </p>
      </div>
    </div>
  );
};

export default CreateChannel;
