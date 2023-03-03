import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

const TeamChannelPreview = ({ channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p className="flex items-center font-roboto text-[14px] text-white py-5 h-full w-full text-elipsis break-all">
      # {channel?.data?.name || channel?.data?.id}
    </p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    return (
      <div className="flex items-center font-roboto text-[14px] text-white py-5 h-full w-full text-elipsis break-all mr-3">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName}
          size={24}
        />
        <p>{members[0]?.user?.fullName}</p>
      </div>
    );
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "h-auto flex items-center bg-[#00000033] rounded-r-[8px] font-bold mr-[16px] cursor-pointer z-10"
          : "h-[37px] flex items-center hover:bg-[#00000033] hover:rounded-r-[8px] hover:font-bold hover:mr-[16px] hover:cursor-pointer"
      }
      onClick={() => {
        console.log(channel);
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;
