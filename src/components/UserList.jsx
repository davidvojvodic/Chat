import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import { InviteIcon } from "../assets";

const ListContainer = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mx-[20px] justify-between">
        <p className="font-roboto text-[14px] leading-[17px] text-[#858688] mt-[16px] flex-[2_2_0%]">
          User
        </p>
        <p className="font-roboto text-[14px] leading-[17px] text-[#858688] mt-[16px] flex-[0.5_0.5_0%] text-right mx-[20px]">
          Invite
        </p>
      </div>
      {children}
    </div>
  );
};

const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    if (selected) {
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== user.id)
      );
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }

    setSelected((prevSelected) => !prevSelected);
  };

  return (
    <div
      className="flex items-center mx-5 my-2 justify-between hover:cursor-pointer hover:bg-[#f7f6f8]"
      onClick={handleSelect}
    >
      <div className="flex items-center flex-[2_2_0%] text-left">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p>{user.fullName || user.id}</p>
      </div>
      {selected ? (
        <InviteIcon />
      ) : (
        <div className="h-7 w-7 bg-[#f7f6f8] border-[1px] border-[#dedddf] ml-1 rounded-[14px]" />
      )}
    </div>
  );
};

const UserList = ({ setSelectedUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await client.queryUsers(
          {
            id: { $ne: client.userID },
          },
          { id: 1 },
          { limit: 8 }
        );

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    if (client) getUsers();
  }, []);

  if (error) {
    return (
      <ListContainer>
        <div className="font-roboto text-[16px] text-[#2c2c30] m-5">
          Error loading, please refresh and try again.
        </div>
      </ListContainer>
    );
  }

  if (listEmpty) {
    return (
      <ListContainer>
        <div className="font-roboto text-[16px] text-[#2c2c30] m-5">
          No users found.
        </div>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {loading ? (
        <div className="font-roboto text-[16px] text-[#2c2c30] m-5">
          Loading users...
        </div>
      ) : (
        users?.map((user, i) => (
          <UserItem
            index={i}
            key={user.id}
            user={user}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </ListContainer>
  );
};

export default UserList;
