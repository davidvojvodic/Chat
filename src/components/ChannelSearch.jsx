import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { SearchIcon } from "../assets";

const ChannelSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const getChannels = async (text) => {
    try {
      // to do: fetch channels
    } catch (error) {
      setQuery("");
    }
  };

  const onSearch = (e) => {
    e.preventDefault();

    setLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  };

  return (
    <div className="relative flex justify-center items-center pt-4 border-t-[1px] border-solid border-[#00000033]">
      <div className="flex justify-center items-center h-[40x] bg-[#ffffff33] rounded-[8px] mb-[8px] border-[1px] border-transparent w-[95%] focus-within:border-white">
        <div className="w-[32px] flex justify-center">
          <SearchIcon />
        </div>
        <input
          className="bg-none border-none text-white outline-none bg-transparent text-[16px] font-roboto"
          placeholder="Search"
          type="text"
          value={query}
          onChange={onSearch}
        />
      </div>
    </div>
  );
};

export default ChannelSearch;
