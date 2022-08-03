const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_VER = '/api/v1';
const USER = '/users/';
const ROOM = '/rooms';
const SOCKET = '/socket/room';

export const API = {
  SOCKET: `${BASE_URL}${SOCKET}`,
  ROOM: `${BASE_URL}${API_VER}${ROOM}`,
  USER: `${BASE_URL}${API_VER}${USER}`,
};
