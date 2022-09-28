const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_VER = '/api/v1';
const USER = '/users/';
const ROOM = '/rooms/';
const SESSION = '/session/';
const SOCKET_ROOM = '/socket/room/';
const SOCKET_LOBBY = '/socket/lobby/';
const ME = 'me/';
const RECORDS = '/records/';
const KAKAO = '/auth/kakao/';
const GOOGLE = '/auth/google/';
const GITHUB = '/auth/github/';
const LAMBDA_URL = process.env.REACT_APP_LAMBDA_INVITE;
const INVITE = '/invite/';
const FRIEND = '/friendships';

export const API = {
  BASE_URL: `${BASE_URL}`,
  SOCKET_ROOM: `${BASE_URL}${SOCKET_ROOM}`,
  SOCKET_LOBBY: `${BASE_URL}${SOCKET_LOBBY}`,
  ROOM: `${BASE_URL}${API_VER}${ROOM}`,
  USER: `${BASE_URL}${API_VER}${USER}`,
  SESSION: `${BASE_URL}${API_VER}${SESSION}`,
  ME: `${BASE_URL}${API_VER}${USER}${ME}`,
  RECORDS: `${BASE_URL}${API_VER}${RECORDS}`,
  KAKAO: `${BASE_URL}${API_VER}${KAKAO}`,
  GOOGLE: `${BASE_URL}${API_VER}${GOOGLE}`,
  GITHUB: `${BASE_URL}${API_VER}${GITHUB}`,
  INVITE: `${LAMBDA_URL}${INVITE}`,
  FRIEND: `${BASE_URL}${API_VER}${FRIEND}`,
};
