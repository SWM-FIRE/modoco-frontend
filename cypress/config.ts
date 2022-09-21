const API_VER = '/api/v1';
const USER = '/users/';
const ROOM = '/rooms/';
const SESSION = '/session/';
const SOCKET = '/socket/room/';
const ME = 'me/';
const RECORDS = '/records/';
const KAKAO = '/auth/kakao/';
const GOOGLE = '/auth/google/';
const GITHUB = '/auth/github/';

export const API = {
  SOCKET: `${SOCKET}`,
  ROOM: `${API_VER}${ROOM}`,
  USER: `${API_VER}${USER}`,
  SESSION: `${API_VER}${SESSION}`,
  ME: `${API_VER}${USER}${ME}`,
  RECORDS: `${API_VER}${RECORDS}`,
  KAKAO: `${API_VER}${KAKAO}`,
  GOOGLE: `${API_VER}${GOOGLE}`,
  GITHUB: `${API_VER}${GITHUB}`,
};
