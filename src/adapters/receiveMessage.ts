/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import moment from 'moment';
import connectedUsersStore from '../stores/connectedUsersStore';
import messageStore from '../stores/messagesStore';
import roomSocket from './roomSocket';
import userStore from '../stores/userStore';
import receiveNewMessageStore from '../stores/receiveNewMessageStore';

const onChatMessage = () => {
  const { connectedUsers } = connectedUsersStore();
  const { setIsReceiveNewMessage, setIsAlarmToggle } = receiveNewMessageStore(
    (state) => state,
  );
  const { messages, setMessages } = messageStore((state) => state);
  const { uid, nickname, avatar } = userStore((state) => state);
  const newSocket = roomSocket.socket;

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
              type: 'message',
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
          type: 'message',
          isHideTime: false,
          isHideNicknameAndAvatar: isHide(messages, receiveMsg),
        },
      ]);
    };

    newSocket.off('chatMessage').on('chatMessage', (message) => {
      setIsReceiveNewMessage(true);
      setIsAlarmToggle();
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
        }
      } else isHideNicknameAndAvatar = false;
      return isHideNicknameAndAvatar;
    };
  }, [connectedUsers, messages]);
};

export default onChatMessage;
