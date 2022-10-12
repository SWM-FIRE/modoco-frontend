/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import moment from 'moment';
import getSocketData from './getSocketData';
import userStore from '../stores/userStore';
import receiveNewMessageStore from '../stores/room/receiveNewMessageStore';
import { SOCKET_EVENT } from './event.enum';

const onChatMessage = (roomId: string) => {
  const { connectedUsers, messages, setMessages, newSocket } =
    getSocketData(roomId);
  const { setIsReceiveNewMessage, setIsAlarmToggle } = receiveNewMessageStore();
  const { uid, nickname, avatar } = userStore();

  useEffect(() => {
    const receiveMessage = (receiveMsg) => {
      const isMe = receiveMsg.sender === uid;
      const userInfo = isMe
        ? {
            uid: receiveMsg.sender,
            nickname,
            avatar,
          }
        : connectedUsers.filter((user) => user.uid === receiveMsg.sender)[0];

      setMessages([
        ...messages.map((m, index) => {
          if (
            index === messages.length - 1 &&
            m.uid === receiveMsg.sender &&
            moment(m.createdAt).format('LT') ===
              moment(receiveMsg.createdAt).format('LT')
          ) {
            return {
              uid: m.uid,
              nickname: m.nickname,
              avatar: m.avatar,
              message: m.message,
              createdAt: m.createdAt,
              type: m.type,
              isHideTime: true,
              isHideNicknameAndAvatar: m.isHideNicknameAndAvatar,
            };
          }
          return m;
        }),
        {
          uid: userInfo.uid,
          nickname: userInfo.nickname,
          avatar: userInfo.avatar,
          message: receiveMsg.message,
          createdAt: receiveMsg.createdAt,
          type: receiveMsg.type,
          isHideTime: false,
          isHideNicknameAndAvatar: isHide(messages, receiveMsg),
        },
      ]);
    };

    newSocket?.on(SOCKET_EVENT.CHAT_MESSAGE, (message) => {
      if (roomId !== 'lobby') {
        setIsReceiveNewMessage(true);
        setIsAlarmToggle();
      }
      receiveMessage(message);
    });

    const isHide = (msg, receiveMsg) => {
      let isHideNicknameAndAvatar = true;

      if (msg.length !== 0) {
        if (
          moment(msg[msg.length - 1].createdAt).format('LT') !==
          moment(receiveMsg.createdAt).format('LT')
        ) {
          isHideNicknameAndAvatar = false;
        } else if (msg[msg.length - 1].uid !== receiveMsg.sender) {
          isHideNicknameAndAvatar = false;
        } else if (msg[msg.length - 1].type !== 'MESSAGE') {
          isHideNicknameAndAvatar = false;
        }
      } else isHideNicknameAndAvatar = false;
      return isHideNicknameAndAvatar;
    };
    return () => {
      newSocket?.off(SOCKET_EVENT.CHAT_MESSAGE);
    };
  }, [connectedUsers, messages]);
};

export default onChatMessage;
