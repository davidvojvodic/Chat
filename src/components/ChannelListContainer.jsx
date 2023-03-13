// Importing necessary components and libraries
import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { BsChatDots } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import "../neksi.css"; // importing stylesheet
import ChannelSearch from "./ChannelSearch";
import TeamChannelList from "./TeamChannelList";
import TeamChannelPreview from "./TeamChannelPreview";

// Initializing cookies object
const cookies = new Cookies();

// Sidebar component
const SideBar = ({ logout }) => (
  <div className="w-[90px] bg-[#1E1F22] shadow-md items-start justify-start flex flex-col">
    {/* Chat icon */}
    <div className="w-[60px] h-[60px] m-[14px] shadow-md cursor-pointer rounded-full bg-[#2B2D31] transition-all duration-300 ease-in-out hover:bg-white">
      <div className="flex items-center justify-center h-[100%]">
        <BsChatDots style={{ width: "45px", height: "45px" }} />
      </div>
    </div>
    {/* Logout icon */}
    <div className="w-[58px] h-[58px] m-[14px] shadow-md cursor-pointer rounded-full bg-[#2B2D31] transition-all duration-300 ease-in-out hover:bg-white">
      <div
        className="flex items-center justify-center h-[100%]"
        onClick={logout}
      >
        <BiLogOut style={{ width: "45px", height: "45px" }} />
      </div>
    </div>
  </div>
);

// Header component
const CompanyHeader = () => (
  <div className="p-4 h-[62px] bg-[#2B2D31]">
    <p className="font-bold text-[18px] leading-[28px] text-white">
      Wincord Chat{/* Company name */}
    </p>
  </div>
);

// Function to filter team channels
const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

// Function to filter messaging channels
const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

// Channel list content component
const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext(); // Initializing chat client

  // Function for log out action
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload();
  };

  const filters = { members: { $in: [client.userID] } }; // Filter object for channels

  return (
    <>
      {/* Sidebar section */}
      <SideBar logout={logout} />

      {/* Main content section */}
      <div className="flex flex-col w-[240px] bg-[#2B2D31]">
        {/* Company header section */}
        <CompanyHeader />

        {/* Search for channel */}
        <ChannelSearch setToggleContainer={setToggleContainer} />

        {/* Team channels */}
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />

        {/* Messaging channels */}
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
};

// This function receives three props/arguments and returns a JSX element. The purpose of this component is to render the ChannelListContent component and also add an optional toggle effect for it.
const ChannelListContainer = ({
  setCreateType, // A function coming from parent component to set/create some filter for the channel list
  setIsCreating, // A function coming from parent component that handles the creation of a new channel
  setIsEditing, // A function coming from parent component that handles the edition of a channel
}) => {
  // Using the useState Hook to create a new state for toggleContainer with initial value false.
  const [toggleContainer, setToggleContainer] = useState(false);

  // Returns two divs, the first one renders the ChannelListContent component and the second one is a conditional div that uses optional toggle effect.
  return (
    <>
      <div className="flex h-full shadow-sm">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>

      {/*  Optional toggle effect */}
      <div
        className="hidden h-full shadow-md absolute w-[90%] top-1 z-[5] transition-all duration-300 ease-in-out"
        style={{
          left: toggleContainer ? "0%" : "-89%", // Shows or hides the div when clicked
          backgroundColor: "#005fff", // Sets the background color of the div
        }}
      >
        <div
          className="hidden w-[50px] h-[50px] bg-[#005fff] absolute right-[-2%] top-[50%] rounded-[50%] z-[2]"
          onClick={
            () =>
              setToggleContainer((prevToggleContainer) => !prevToggleContainer) // Toggles the value of toggleContainer
          }
        ></div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
