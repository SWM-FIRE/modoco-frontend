import newUser from 'src/interface/newUser.interface';
import {
  authorizationRequest,
  unAuthorizationRequest,
  awsRequest,
} from './core/index';
import { API } from '../config';
// import * as axiosI from '../interface/axios/index';

// get a user inform
const getUser = (uid: number) => {
  return authorizationRequest.get((API.USER as string) + uid);
};

// get me
const getMe = () => {
  return authorizationRequest.get(API.ME);
};

// change me
const changeMe = (uid: number, nickname: string, avatar: number) => {
  return authorizationRequest.put(API.USER, {
    uid,
    avatar,
    nickname,
  });
};

// change profile
const changeProfile = (user: newUser) => {
  return authorizationRequest.put(API.USER, {
    user,
  });
};

// login
const login = (email: string, password: string) => {
  return unAuthorizationRequest.post(API.SESSION, {
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
  return unAuthorizationRequest.post(API.USER, {
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
  return authorizationRequest.post(API.ROOM, room);
};

// get rooms
const getRooms = () => {
  return unAuthorizationRequest.get(API.ROOM);
};

// get a room
const getRoom = (roomId: string) => {
  return authorizationRequest.get((API.ROOM as string) + roomId);
};

// request friend
const requestFriend = (friendUid: number) => {
  return authorizationRequest.post(API.FRIEND, {
    friend: friendUid,
  });
};

// accept friend
const acceptFriend = (friendUid: number) => {
  return authorizationRequest.put(API.FRIEND, {
    friend: friendUid,
  });
};

// delete friend
const deleteFriend = (friendUid: number) => {
  return authorizationRequest.delete(API.FRIEND, {
    data: {
      friend: friendUid,
    },
  });
};

// get All friends
const getAllFriends = () => {
  return authorizationRequest.get(API.FRIEND);
};

// get a friend
const getFriend = (friendUid: number) => {
  return authorizationRequest.get(API.FRIEND, {
    params: {
      friend: friendUid,
    },
  });
};

// get records
const getRecords = () => {
  return authorizationRequest.get(API.RECORDS);
};

export {
  getUser,
  getMe,
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
  changeProfile,
};
