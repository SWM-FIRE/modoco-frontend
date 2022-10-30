import { useState } from 'react';

interface User {
  nickname: string;
  uid: number;
  avatar: number;
  sid: string;
}

export default function useConnectedLobbyUsers() {
  const [connectedLobbyUsers, setConnectedLobbyUsers] = useState<User[]>([]);
  const setUsers = (users: User[]) => {
    setConnectedLobbyUsers(users);
  };
  const appendUser = (user: User) => {
    setConnectedLobbyUsers((prev) => [...prev, user]);
  };

  const removeUserBySid = (sid: string) => {
    setConnectedLobbyUsers((prev) => prev.filter((user) => user.sid !== sid));
  };
  const findUserBySid = (sid: string) => {
    const returnUser = connectedLobbyUsers.find((user) => user.sid === sid);
    if (returnUser) return returnUser;
    return null;
  };
  const findUserByUid = (uid: number) => {
    const returnUser = connectedLobbyUsers.find((user) => user.uid === uid);
    if (returnUser) return returnUser;
    return null;
  };
  return {
    connectedLobbyUsers,
    setUsers,
    appendUser,
    removeUserBySid,
    findUserBySid,
    findUserByUid,
  };
}
