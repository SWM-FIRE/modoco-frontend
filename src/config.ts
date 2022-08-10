const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_VER = '/api/v1';
const USER = '/users/';
const ROOM = '/rooms/';
const SESSION = '/session/';
const SOCKET = '/socket/room';
const ME = 'me/';

export const API = {
  SOCKET: `${BASE_URL}${SOCKET}`,
  ROOM: `${BASE_URL}${API_VER}${ROOM}`,
  USER: `${BASE_URL}${API_VER}${USER}`,
  SESSION: `${BASE_URL}${API_VER}${SESSION}`,
  ME: `${BASE_URL}${API_VER}${USER}${ME}`,
};
