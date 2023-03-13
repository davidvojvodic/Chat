import React from "react";
import { AddChannel } from "../assets"; //Importing an AddChannel component from assets folder

const TeamChannelList = ({
  children, // JSX components passed as children to this component
  error = false, // A Boolean indicating if there's an error in the data fetching process (defaults to false)
  loading, // A Boolean indicating if data is currently being fetched
  type, // A string identifying whether the channel list is for team channels or direct messages
  isCreating, // A Boolean indicating if a new channel or message is being created
  setIsCreating, // A function to toggle the isCreating state
  setCreateType, // A function to set the type of channel/message being created
  setIsEditing, // A function to toggle the isEditing state
  setToggleContainer, // A function to toggle the mobile navigation container
}) => {
  if (error) {
    // If there's an error...
    return type === "team" ? ( // ... and the channel list is for team channels...
      <div className="w-[100%] flex flex-col">
        <p className="text-white px-4">
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null; // ... return an error message or nothing if it's for direct messages
  }

  if (loading) {
    // If data is still loading...
    return (
      <div className="w-[100%] flex flex-col">
        <p className="text-white px-4 h-[115px]">
          {type === "team" ? "Channels" : "Messages"} loading...
        </p>
      </div>
    );
  }

  return (
    <div className="w-[100%] flex flex-col">
      <div className="px-4 flex justify-between mt-2">
        <p className="font-roboto text-[13px] leading-[16px] h-[16px] text-[#ffffffa8] mb-3">
          {type === "team" ? "Channels" : "Direct Messages"}{" "}
        </p>
        <AddChannel
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          type={type === "team" ? "team" : "messaging"}
          setToggleContainer={setToggleContainer}
        />
      </div>
      {children} {/* Displays child components passed to this component */}
    </div>
  );
};

export default TeamChannelList;
