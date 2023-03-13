// This code is written in Javascript React programming language
// Importing necessary components from 'react', 'stream-chat-react'
import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

// Function channelByUser handles the chat channel creation for two members at maximum
const channelByUser = async ({
  client,
  setActiveChannel,
  channel,
  setChannel,
}) => {
  // Filters to get type of channel messaging and have only 2 members
  const filters = {
    type: "messaging",
    member_count: 2,
    members: { $eq: [client.user.id, client.userID] },
  };

  // Check for existing channels with given filters
  const [existingChannel] = await client.queryChannels(filters);

  if (existingChannel) return setActiveChannel(existingChannel);

  // If the channel does not exist, create a new channel for messaging between two members
  const newChannel = client.channel("messaging", {
    members: [channel.id, client.userID],
  });

  // Set this newly created channel as current channel
  setChannel(newChannel);

  return setActiveChannel(newChannel);
};

// Functional component SearchResult returns the results of search query
// and renders DOM appropriately based on the type of result
const SearchResult = ({
  channel,
  focusedId,
  type,
  setChannel,
  setToggleContainer,
}) => {
  // Accessing required variables from Stream Chat Context using 'useChatContext' hook
  const { client, setActiveChannel } = useChatContext();

  // If the search query result type is a channel
  if (type === "channel") {
    return (
      <div
        onClick={() => {
          // Displays information of clicked channel and toggles channel-container visibility
          setChannel(channel);
          if (setToggleContainer) {
            setToggleContainer((prevState) => !prevState);
          }
        }}
        className={
          focusedId === channel.id
            ? "w-full h-[48px] flex items-center bg-[var(--primary-color-alpha)]"
            : "w-full h-[48px] flex items-center hover:cursor-pointer hover:bg-[var(--primary-color-alpha)]"
        }
      >
        {/* Display # sign before name of the channel */}
        <div className="h-[24px] w-[28px] bg-[var(--primary-color)] rounded-[24px] m-3 flex items-center justify-center font-roboto font-bold text-[14px] leading-[120%] text-white">
          #
        </div>
        {/* The name of the channel */}
        <p className="w-full font-roboto font-semibold text-[14px] leading-[120%] text-[#2c2c30]">
          {channel.data.name}
        </p>
      </div>
    );
  }

  // If the search query result type is a user with an appropriate avatar image
  return (
    <div
      onClick={async () => {
        // Creates a new messaging channel between logged in user and selected user
        channelByUser({ client, setActiveChannel, channel, setChannel });
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
      className={
        focusedId === channel.id
          ? "w-full h-[48px] flex items-center bg-[var(--primary-color-alpha)]"
          : "w-full h-[48px] flex items-center hover:cursor-pointer hover:bg-[var(--primary-color-alpha)]"
      }
    >
      {/* Renders avatar image or default profile icon */}
      <div className="flex items-center ml-3">
        <Avatar
          image={channel.image || undefined}
          name={channel.name}
          size={24}
        />
        {/* Name of the user */}
        <p className="w-full font-roboto font-semibold text-[14px] leading-[120%] text-[#2c2c30]">
          {channel.name}
        </p>
      </div>
    </div>
  );
};

// Functional component ResultsDropdown is used to show a list of channel search results
// obtained from server.
const ResultsDropdown = ({
  teamChannels,
  directChannels,
  focusedId,
  loading,
  setChannel,
  setToggleContainer,
}) => {
  return (
    // Dropdown div container that displays search query results
    <div className="absolute h-fit w-[300px] bg-white border-[1px] border-[#e9e9ea] box-border shadow-md rounded-lg z-10 left-[230px] top-[16px]">
      {/* Header for displaying searched channel information */}
      <p className="w-fit flex items-center font-roboto font-semibold text-[14px] leading-[120%] text-[#858688] ml-3">
        Channels
      </p>
      {/* Loading message when no search results available */}

      {/* // Check if component is currently loading and there are no team channels found */}
      {loading && !teamChannels.length && (
        <p className="w-fit flex items-center font-roboto font-semibold text-[14px] leading-[120%] text-[#858688] ml-3">
          <i>Loading...</i>
        </p>
      )}
      {!loading && !teamChannels.length ? (
        <p className="w-fit flex items-center font-roboto font-semibold text-[14px] leading-[120%] text-[#858688] ml-3">
          <i>No channels found</i>
        </p>
      ) : (
        teamChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type="channel"
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
      <p className="w-fit flex items-center font-roboto font-semibold text-[14px] leading-[120%] text-[#858688] ml-3">
        Users
      </p>
      {loading && !directChannels.length && (
        <p className="w-fit flex items-center font-roboto font-semibold text-[14px] leading-[120%] text-[#858688] ml-3">
          <i>Loading...</i>
        </p>
      )}
      {/* // Check if component is not currently loading and there are no direct channels found */}
      {!loading && !directChannels.length ? (
        // Display a message indicating there are no channels found with 'No direct messages found' in italicized font
        <p className="w-fit flex items-center font-roboto font-semibold text-[14px] leading-[120%] text-[#858688] ml-3">
          <i>No direct messages found</i>
        </p>
      ) : (
        // Using map to display and iterate over each direct channel found using the SearchResult component
        directChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type="user"
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
    </div>
  );
};

export default ResultsDropdown;
