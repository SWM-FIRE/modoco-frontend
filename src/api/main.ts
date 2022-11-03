import newUser from 'src/interface/newUser.interface';
import {
  authorizationRequest,
  unAuthorizationRequest,
  awsRequest,
  youtubeAxios,
} from './core/index';
import { API } from '../config';

// get a user inform
const getUser = (uid: number) => {
  return authorizationRequest.get((API.USER as string) + uid);
};

// get me
const getMe = () => {
  return authorizationRequest.get(API.ME as string);
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
  const newGithubLink = `https://github.com/${user.github_link}`;
  return authorizationRequest.put(API.USER, {
    avatar: user.avatar,
    nickname: user.nickname,
    groups: user.groups,
    github_link: newGithubLink,
    blog_link: user.blog_link,
    email: user.email,
    status_quo: user.status_quo,
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
const getInviteCode = (roomId: number, password: string) => {
  if (password === '') {
    return awsRequest.get(`${API.INVITE as string}${roomId}`);
  }
  return awsRequest.post(`${API.INVITE as string}${roomId}`, {
    password,
  });
};

// create a room
const createRoom = (
  moderator: { uid: number },
  title: string,
  details: string,
  tags: string[],
  total: number,
  theme: string,
  isPublic: boolean,
  password: string,
) => {
  const room = {
    moderator,
    title,
    details,
    tags,
    total,
    theme,
    isPublic,
    password,
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

/**
 * youtube
 */

// search youtube video
const searchYoutubeVideo = (keyword: string) => {
  return youtubeAxios.get(API.YOUTUBE_SEARCH, {
    params: {
      q: keyword,
      part: 'snippet',
      maxResults: 15,
      type: 'video',
      videoEmbeddable: true,
      videoCategoryId: 10,
    },
  });
};

// delete room
const deleteRoom = (roomId: number) => {
  return authorizationRequest.delete((API.ROOM as string) + roomId);
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
  searchYoutubeVideo,
  deleteRoom,
};
