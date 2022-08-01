import { useEffect } from 'react';
import moment from 'moment';
import connectedUsersStore from '../stores/connectedUsersStore';
import messageStore from '../stores/messagesStore';
import roomSocket from './roomSocket';

const onChatMessage = () => {
  const { connectedUsers } = connectedUsersStore();
  const { messages, setMessages } = messageStore();

  useEffect(() => {
    const receiveMessage = (receiveMsg) => {
      const isMe = receiveMsg.sender === localStorage.getItem('uid');
      const userInfo = isMe
        ? {
            uid: receiveMsg.sender,
            nickname: localStorage.getItem('nickname'),
            avatar: localStorage.getItem('avatar'),
          }
        : connectedUsers.filter((user) => user.uid === receiveMsg.sender)[0];

      setMessages([
        ...messages.map((m) => {
          if (
            m.uid === receiveMsg.sender &&
            m.createdAt === moment(receiveMsg.createdAt).format('LT')
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
          createdAt: moment(receiveMsg.createdAt).format('LT'),
          type: 'message',
          isHideTime: false,
          isHideNicknameAndAvatar: isHide(messages, receiveMsg),
        },
      ]);
    };

    roomSocket.off('chatMessage').on('chatMessage', (message) => {
      receiveMessage(message);
    });

    const isHide = (msg, receiveMsg) => {
      let isHideNicknameAndAvatar = true;

      if (msg.length !== 0) {
        if (
          msg[msg.length - 1].createdAt !==
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
