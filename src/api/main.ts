import { request, awsRequest } from './core/index';
import { API } from '../config';
// import * as axiosI from '../interface/axios/index';

// get a user inform
const getUser = (uid: number) => {
  return request.get((API.USER as string) + uid, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
};

// get me
const getMe = (token: string) => {
  return request.get(API.ME, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getMeWithToken = (token: string) => {
  return request.get(API.ME, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// change me
const changeMe = (uid: number, nickname: string, avatar: number) => {
  return request.put(
    API.USER,
    {
      uid,
      avatar,
      nickname,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  );
};

// login
const login = (email: string, password: string) => {
  return request.post(API.SESSION, {
    email,
    password,
  });
};

// signup
const signUp = (
  avatar: number,
  nickname: string,
  email: string,
  password: string,
) => {
  return request.post(API.USER, {
    avatar,
    nickname,
    email,
    password,
  });
};

// invite user
const getInviteCode = (roomId: number) => {
  return awsRequest.get((API.INVITE as string) + roomId);
};

// create a room
const createRoom = (
  moderator: { uid: number },
  title: string,
  details: string,
  tags: string[],
  total: number,
  theme: string,
) => {
  const room = {
    moderator,
    title,
    details,
    tags,
    total,
    theme,
  };
  return request.post(API.ROOM, room, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
};

// get rooms
const getRooms = () => {
  return request.get(API.ROOM);
};

// get a room
const getRoom = (roomId: string) => {
  return request.get((API.ROOM as string) + roomId, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
};

// request friend
const requestFriend = (friendUid: number) => {
  return request.post(
    API.FRIEND,
    {
      friend: friendUid,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  );
};

// accept friend
const acceptFriend = (friendUid: number) => {
  return request.put(
    API.FRIEND,
    {
      friend: friendUid,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  );
};

// delete friend
const deleteFriend = (friendUid: number) => {
  return request.delete(API.FRIEND, {
    data: {
      friend: friendUid,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
};

// get All friends
const getAllFriends = () => {
  return request.get(API.FRIEND, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
};

// get a friend
const getFriend = (friendUid: number) => {
  return request.get(API.FRIEND, {
    params: {
      friend: friendUid,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
};

// get records
const getRecords = () => {
  return request.get(API.RECORDS, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
};

export {
  getUser,
  getMe,
  getMeWithToken,
  getInviteCode,
  createRoom,
  getRooms,
  getRoom,
  requestFriend,
  changeMe,
  login,
  signUp,
  acceptFriend,
  deleteFriend,
  getAllFriends,
  getFriend,
  getRecords,
};
