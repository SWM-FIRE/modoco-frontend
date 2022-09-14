const BASE_URL = process.env.REACT_APP_BASE_URL;
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
  BASE_URL: `${BASE_URL}`,
  SOCKET: `${BASE_URL}${SOCKET}`,
  ROOM: `${BASE_URL}${API_VER}${ROOM}`,
  USER: `${BASE_URL}${API_VER}${USER}`,
  SESSION: `${BASE_URL}${API_VER}${SESSION}`,
  ME: `${BASE_URL}${API_VER}${USER}${ME}`,
  RECORDS: `${BASE_URL}${API_VER}${RECORDS}`,
  KAKAO: `${BASE_URL}${API_VER}${KAKAO}`,
  GOOGLE: `${BASE_URL}${API_VER}${GOOGLE}`,
  GITHUB: `${BASE_URL}${API_VER}${GITHUB}`,
};
