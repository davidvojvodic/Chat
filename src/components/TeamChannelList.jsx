import React from "react";
import { AddChannel } from "../assets";

const TeamChannelList = ({ children, error = false, loading, type }) => {
  if (error) {
    return type === "team" ? (
      <div className="w-[100%] flex flex-col">
        <p className="text-white px-4">
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }

  if (loading) {
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
      <div className="px-4 flex justify-between items-center">
        <p className="font-roboto text-[13px] leading-[16px] h-[16px] text-[#ffffffa8] mb-3">
          {type === "team" ? "Channels" : "Direct Messages"}{" "}
        </p>
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
