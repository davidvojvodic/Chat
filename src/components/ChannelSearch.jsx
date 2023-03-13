import React, { useState, useEffect } from "react"; // Importing necessary modules and components
import { useChatContext } from "stream-chat-react";
import { SearchIcon } from "../assets";
import { ResultsDropdown } from "./";

const ChannelSearch = ({ setToggleContainer }) => {
  // Defining a function component with a prop called setToggleContainer
  const { client, setActiveChannel } = useChatContext(); // Extracting client and setActiveChannel from useChatContext hook
  const [query, setQuery] = useState(""); // Defining a state variable called query and a function to update it called setQuery
  const [loading, setLoading] = useState(false); // Defining a state variable called loading and a function to update it called setLoading
  const [teamChannels, setTeamChannels] = useState([]); // Defining a state variable called teamChannels and a function to update it called setTeamChannels, with an initial state of empty array.
  const [directChannels, setDirectChannels] = useState([]); // Defining a state variable called directChannels and a function to update it called setDirectChannels, with an initial state of empty array.

  useEffect(() => {
    // Defining a side effect that gets called when the component is mounted or when the query state is changed
    if (!query) {
      // If there's no query value
      setTeamChannels([]); // Set the teamChannels state to empty array
      setDirectChannels([]); // Set the directChannels state to empty array
    }
  }, [query]);

  const getChannels = async (text) => {
    // Declaring an asynchronous function called getChannels that retrieves channels from the Stream Chat API
    try {
      const channelResponse = client.queryChannels({
        // Querying for channels whose type is 'team', name matches the text and the authenticated user is a member.
        type: "team",
        name: { $autocomplete: text },
        members: { $in: [client.userID] },
      });

      const userResponse = client.queryUsers({
        // Querying for users whose name matches the text and are not the current user.
        id: { $ne: client.userID },
        name: { $autocomplete: text },
      });

      const [channels, { users }] = await Promise.all([
        // Resolving two promises at once using Promise.all() method - channelResponse and userResponse.
        channelResponse,
        userResponse,
      ]);

      if (channels.length) setTeamChannels(channels); // If the queried channels exist and have length, set them to the teamChannels state.
      if (users.length) setDirectChannels(users); // If the queried users exist and have length, set them to the directChannels state.
    } catch (error) {
      setQuery(""); // If there's errors, set the query as empty string.
    }
  };

  const onSearch = (e) => {
    // Handling search queries
    e.preventDefault(); // Preventing default form submission

    setLoading(true); // Setting the loading state as true
    setQuery(e.target.value); // Updating the query state with the value entered by the user
    getChannels(e.target.value); // Calling the getChannels function with the value entered by the user
  };

  const setChannel = (channel) => {
    // A function that sets the active chat channel
    setQuery(""); // Setting the query as empty string
    setActiveChannel(channel); // Updating the active channel with the specified channel passed in a parameter.
  };

  return (
    <div className="relative flex justify-center items-center pt-4 border-t-[1px] border-solid border-[#00000033]">
      <div className="flex justify-center items-center h-[40x] bg-[#ffffff33] rounded-[8px] mb-[8px] border-[1px] border-transparent w-[95%] focus-within:border-white">
        <div className="w-[32px] flex justify-center">
          {/* A magnifying glass icon component from Assets folder */}
          <SearchIcon />
        </div>
        <input // An input field for searching the channel or users with additional properties: placeholder, type and onChange.
          className="bg-none border-none text-white outline-none bg-transparent text-[16px] font-roboto"
          placeholder="Search"
          type="text"
          value={query}
          onChange={onSearch}
        />
      </div>
      {query && ( // Conditionally rendering a dropdown menu only if the search query is truthy
        <ResultsDropdown // Importing ResultsDropdown component as per naming import
          teamChannels={teamChannels} // Passing teamChannels as a prop to the child component
          directChannels={directChannels} // Passing directChannels as a prop to the child component
          loading={loading} // Passing loading state as a prop to the child component
          setChannel={setChannel} // Passing setChannel function
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        />
      )}
    </div>
  );
};

export default ChannelSearch;
