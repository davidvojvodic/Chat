import React from "react"; // import the React module
import { Avatar, useChatContext } from "stream-chat-react"; // import Avatar and useChatContext components from the Stream Chat package

const TeamChannelPreview = ({
  setActiveChannel,
  setIsCreating,
  setIsEditing,
  setToggleContainer,
  channel,
  type,
}) => {
  const { channel: activeChannel, client } = useChatContext(); // get the current chat channel and client using the useChatContext hook

  const ChannelPreview = () => (
    // define a function component to render a team channel preview
    <p className="flex items-center font-roboto text-[14px] text-white py-5 h-full w-full text-elipsis break-all">
      # {channel?.data?.name || channel?.data?.id}
      {/* // show the channel name if it exists or the channel id if not  */}
    </p>
  );

  const DirectPreview = () => {
    // define a function component to render a direct message preview
    const members = Object.values(channel.state.members).filter(
      // get all members of the channel except the current user
      ({ user }) => user.id !== client.userID
    );

    console.log(members[0]);

    return (
      <div className="flex items-center font-roboto text-[14px] text-white py-5 h-full w-full text-elipsis break-all mr-3">
        <Avatar // show the avatar of the other member in the direct message
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
        {/* // show the name of the other member in the direct message */}
      </div>
    );
  };

  return (
    <div // render the team channel or direct message preview depending on the type prop passed
      className={
        channel?.id === activeChannel?.id
          ? "h-auto p-2 ml-2 flex items-center bg-[#00000033] rounded-lg font-bold mr-[16px] cursor-pointer z-10"
          : "h-[37px] p-2 ml-2 flex items-center hover:bg-[#00000033] hover:rounded-lg hover:font-bold hover:mr-[16px] hover:cursor-pointer"
      }
      onClick={() => {
        // assign a click event to the div that sets the values passed in as props when activated
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);

        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState); // toggle the display of the container by passing the current state to setState in boolean form
        }
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
      {/* // determine which component to render based on the value of the type prop  */}
    </div>
  );
};

export default TeamChannelPreview; // export the TeamChannelPreview component
