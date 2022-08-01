// import styled from 'styled-components';
// import axios from 'axios';
// import { useEffect, useState, useCallback } from 'react';
// import { io } from 'socket.io-client';
// import { useParams } from 'react-router-dom';
// import Header from '../components/room/Header';
// import ScreenShare from '../components/room/ScreenShare';
// import Sidebar from '../components/room/Sidebar';
// import ScreenShareModal from '../components/room/ScreenModal';
// import controlModal from '../stores/controlModal';
// import usePreventLeave from '../hooks/usePreventLeave';
// import connectedUsersStore from '../stores/connectedUsersStore';
// import {
//   socketInit,
//   emitJoinChatRoom,
//   onJoinedRoom,
//   onChatMessage,
//   onLeftRoom,
//   onDisconnect,
// } from '../adapters/chat/socketio';

// export default function Room() {
//   const [userList, setUserList] = useState({});
//   const [messages, setMessages] = useState([]);
//   const { isOpen } = controlModal();
//   const { roomId } = useParams();
//   const { enablePrevent, disablePrevent } = usePreventLeave();
//   const { connectedUsers, appendUser, removeUser } = connectedUsersStore();
//   const myuid = localStorage.getItem('uid');

//   useEffect(() => {
//     const videoSocket = io(process.env.REACT_APP_SOCKET_VIDEO_URL as string);

//     videoSocket.on('connect', () => {
//       console.log('socket server connected.');
//       const payload = { room: roomId, uid: myuid };
//       videoSocket.emit('joinRoom', payload);
//     });

//     videoSocket.on(`${roomId}-update-user-list`, ({ users }) => {
//       users.map((user) => {
//         axios
//           .get((process.env.REACT_APP_GET_USER_INFO as string) + user.uid)
//           .then((res) => {
//             if (!connectedUsers.includes(user.uid)) {
//               appendUser({
//                 nickname: res.data.nickname,
//                 uid: res.data.uid,
//                 avatar: res.data.avatar,
//                 socketId: user.id,
//               });
//             }
//           });
//         return user;
//       });
//       console.log('updated user list');
//     });

//     videoSocket.on(`${roomId}-add-user`, (user) => {
//       axios
//         .get((process.env.REACT_APP_GET_USER_INFO as string) + user.uid)
//         .then((res) => {
//           if (!connectedUsers.includes(user.uid)) {
//             console.log('new', res.data.nickname, 'joined');
//             appendUser({
//               nickname: res.data.nickname,
//               uid: user.uid,
//               avatar: res.data.avatar,
//               socketId: user.user,
//             });
//           }
//         });
//     });

//     videoSocket.on(`${roomId}-remove-user`, (user) => {
//       console.log('remove user', user);
//       removeUser(user.socketId);
//     });
//     socketInit();
//     emitJoinChatRoom(roomId, myuid);
//     onJoinedRoom(receiveJoin);
//     onChatMessage(receiveMessage);
//     onLeftRoom();
//     onDisconnect();
//   }, []);

//   useEffect(() => {
//     enablePrevent();
//     return disablePrevent;
//   }, []);

//   const receiveJoin = (uid) => {
//     const API_URL = process.env.REACT_APP_GET_USER_INFO as string;
//     axios.get(API_URL + uid).then((res) => {
//       setMessages([
//         ...messages,
//         { type: 'join', uid, nickname: res.data.nickname },
//       ]);
//     });
//   };

//   const isHide = (messages, receiveMsg) => {
//     let isHideNicknameAndAvatar = true;

//     if (messages.length !== 0) {
//       if (messages[messages.length - 1].createdAt !== receiveMsg.createdAt) {
//         isHideNicknameAndAvatar = false;
//       } else if (messages[messages.length - 1].uid !== receiveMsg.sender) {
//         isHideNicknameAndAvatar = false;
//       }
//     } else isHideNicknameAndAvatar = false;
//     return isHideNicknameAndAvatar;
//   };

//   const receiveMessage = useCallback((receiveMsg) => {
//     if (!userList[receiveMsg.sender]) {
//       try {
//         const API_URL = process.env.REACT_APP_GET_USER_INFO as string;
//         axios.get(API_URL + receiveMsg.sender).then((res) => {
//           setUserList((users) => {
//             return { ...users, [receiveMsg.sender]: res.data };
//           });
//           setMessages((message) => [
//             ...message.map((m) => {
//               if (
//                 m.uid === receiveMsg.sender &&
//                 m.createdAt === receiveMsg.createdAt
//               ) {
//                 return {
//                   uid: m.uid,
//                   nickname: m.nickname,
//                   avatar: m.avatar,
//                   message: m.message,
//                   createdAt: m.createdAt,
//                   type: 'message',
//                   isHideTime: true,
//                   isHideNicknameAndAvatar: m.isHideNicknameAndAvatar,
//                 };
//               }
//               return m;
//             }),
//             {
//               uid: receiveMsg.sender,
//               nickname: res.data.nickname,
//               avatar: res.data.avatar,
//               message: receiveMsg.message,
//               createdAt: receiveMsg.createdAt,
//               type: 'message',
//               isHideTime: false,
//               isHideNicknameAndAvatar: isHide(message, receiveMsg),
//             },
//           ]);
//         });
//       } catch (err) {
//         console.log('error!! ', err);
//       }
//     } else {
//       setMessages((message) => [
//         ...message.map((m) => {
//           if (
//             m.uid === receiveMsg.sender &&
//             m.createdAt === receiveMsg.createdAt
//           ) {
//             return {
//               uid: m.uid,
//               nickname: m.nickname,
//               avatar: m.avatar,
//               message: m.message,
//               createdAt: m.createdAt,
//               type: 'message',
//               isHideTime: true,
//               isHideNicknameAndAvatar: m.isHideNicknameAndAvatar,
//             };
//           }
//           return m;
//         }),
//         {
//           uid: receiveMsg.sender,
//           nickname: userList[receiveMsg.sender].nickname,
//           avatar: userList[receiveMsg.sender].avatar,
//           message: receiveMsg.message,
//           createdAt: receiveMsg.createdAt,
//           type: 'message',
//           isHideTime: false,
//           isHideNicknameAndAvatar: isHide(message, receiveMsg),
//         },
//       ]);
//     }
//   }, []);

//   return (
//     <>
//       <Component>
//         <Header />
//         <Contents>
//           <ScreenShare />
//           <Sidebar />
//         </Contents>
//       </Component>
//       {isOpen && <ScreenShareModal />}
//     </>
//   );
// }

// const Component = styled.div`
//   height: 100vh;
// `;

// const Contents = styled.div`
//   background-color: #18181b;
//   height: calc(100% - 10rem);
//   display: flex;
//   position: relative;
// `;
