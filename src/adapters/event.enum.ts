/**
 * SOCKET EVENT CONSTANTS
 * @description Event constants, used to identify socket events.
 * @note Didn't use enum because it does not support treeshaking.
 * @constant
 * @type {Object}
 * @property {string} NEW_USER - new user joined event
 * @property {string} ALREADY_JOINED - user already joined room
 * @property {string} ROOM_FULL - room is full
 * @property {string} JOINED_ROOM - user joined room successfully in the Server Side
 * @property {string} NEW_USER - new user joined event to all users in the room except the new user
 * @property {string} KICK_USER - kick user event
 * @property {string} EXISTING_ROOM_USERS - existing users in the joining room
 * @property {string} LEAVE_ROOM - user trigger when user intends to leave the room (ex. 나가기 버튼 클릭)
 * @property {string} LEFT_ROOM - user left room successfully in the Server Side
 * @property {string} CHAT_MESSAGE - user sent a chat message to all users in the room
 * @property {string} CALL_USER - user sent a sdp offer to another user
 * @property {string} CALL_MADE - server send a sdp offer, received by CALL_USER event to another user which in specific in the payload
 * @property {string} MAKE_ANSWER - user sent a sdp answer to another user
 * @property {string} ANSWER_MADE - server send a sdp answer, received by MAKE_ANSWER event to another user which in specific in the payload
 * @property {string} ICE_CANDIDATE - user sent an ice-candidate to another user
 * @property {string} VIDEO_STATE_CHANGE - video state change event
 * @property {string} AUDIO_STATE_CHANGE - audio state change event
 * @property {string} EXCEPTION - exception event
 *
 * @property {string} JOIN_LOBBY - new user joined event
 * @property {string} NEW_USER_JOINED_LOBBY - new user joined event to all users in the lobby except the new user
 * @property {string} EXISTING_LOBBY_USERS - existing users in the lobby
 * @property {string} LEAVE_LOBBY - user trigger when user intends to leave the lobby
 * @property {string} LEFT_LOBBY - user left lobby successfully in the Server Side
 */
export const SOCKET_EVENT = {
  JOIN_ROOM: 'joinRoom',
  ALREADY_JOINED: 'alreadyJoined',
  ROOM_FULL: 'roomFull',
  JOINED_ROOM: 'joinedRoom',
  NEW_USER: 'newUser',
  KICK_USER: 'kickUser',
  EXISTING_ROOM_USERS: 'existingRoomUsers',
  LEAVE_ROOM: 'leaveRoom',
  LEFT_ROOM: 'leftRoom',
  CHAT_MESSAGE: 'chatMessage',
  CALL_USER: 'call-user',
  CALL_MADE: 'call-made',
  MAKE_ANSWER: 'make-answer',
  ANSWER_MADE: 'answer-made',
  ICE_CANDIDATE: 'ice-candidate',
  RECORD_TIME: 'recordTime',
  VIDEO_STATE_CHANGE: 'videoStateChange',
  AUDIO_STATE_CHANGE: 'audioStateChange',
  EXCEPTION: 'exception',
  DISCONNECT: 'disconnect',
  JOIN_LOBBY: 'joinLobby',
  NEW_USER_JOINED_LOBBY: 'newUserJoinedLobby',
  EXISTING_LOBBY_USERS: 'existingUsers',
  LEAVE_LOBBY: 'leaveLobby',
  LEFT_LOBBY: 'LeftLobby',
} as const;

export type EVENT = typeof SOCKET_EVENT[keyof typeof SOCKET_EVENT];
