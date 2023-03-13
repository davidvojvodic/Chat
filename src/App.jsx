// Importing necessary modules and components
import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { ChannelList, Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import ChannelListContainer from "./components/ChannelListContainer";
import ChannelContainer from "./components/ChannelContainer";
import Auth from "./components/Auth";
import "./App.css";

import "stream-chat-react/dist/css/index.css";

// Creating an instance of a cookie class
const cookies = new Cookies();
// Defining the API key to be used with the StreamChat API
const apiKey = "7pfzcftww5pm";
// Creating a client instance of StreamChat that will be used throughout the App
const client = StreamChat.getInstance(apiKey);
// Getting the authentication token stored in cookies
const authToken = cookies.get("token");

// If authToken is present in cookies, connect the user using the details stored in cookies
if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}

// Define main App function
const App = () => {
  // Initialize states for various variables
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // If no authToken is present, display the Auth component
  if (!authToken) return <Auth />;

  // Main App render method
  return (
    <div className="flex flex-1 h-[100%] shadow-[rgba(0,0,0,0.33)] br-[16px]">
      {/* Rendering a chat component */}
      {/* Providing required props to ChannelListContainer and ChannelComponent */}
      <Chat client={client} theme="dark">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;
