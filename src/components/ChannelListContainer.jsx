import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { BsChatDots } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import "../neksi.css";
import ChannelSearch from "./ChannelSearch";
import TeamChannelList from "./TeamChannelList";
import TeamChannelPreview from "./TeamChannelPreview";

const SideBar = () => (
  <div className="w-[90px] bg-gradient-to-b from-gray-800 to-gray-500 shadow-md items-start justify-start flex flex-col">
    <div className="w-[60px] h-[60px] m-[14px] shadow-md cursor-pointer rounded-full bg-white">
      <div className="flex items-center justify-center h-[100%]">
        <BsChatDots style={{ width: "45px", height: "45px" }} />
      </div>
    </div>
    <div className="w-[58px] h-[58px] m-[14px] shadow-md cursor-pointer rounded-full bg-white">
      <div className="flex items-center justify-center h-[100%]">
        <BiLogOut style={{ width: "45px", height: "45px" }} />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="p-4 h-[62px]">
    <p className="font-bold text-[18px] leading-[28px] text-white">
      Wincord Chat
    </p>
  </div>
);

const ChannelListContainer = () => {
  return (
    <>
      <SideBar />
      <div className="flex flex-col w-[240px] bg-gradient-to-b from-gray-600 to-gray-400">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => <TeamChannelList {...listProps} type="team" />}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="team" />
          )}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList {...listProps} type="messaging" />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="messaging" />
          )}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
