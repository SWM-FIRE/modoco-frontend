import { useEffect } from 'react';
import connectedUsersStore from '../stores/connectedUsersStore';
import messageStore from '../stores/messagesStore';
import roomSocket from './roomSocket';

const onChatMessage = () => {
  const { connectedUsers } = connectedUsersStore();
  const { messages, appendMessages } = messageStore();

  useEffect(() => {
    const isHide = (msg, receiveMsg) => {
      let isHideNicknameAndAvatar = true;

      if (msg.length !== 0) {
        if (msg[msg.length - 1].createdAt !== receiveMsg.createdAt) {
          isHideNicknameAndAvatar = false;
        } else if (msg[msg.length - 1].uid !== receiveMsg.sender) {
          isHideNicknameAndAvatar = false;
        }
      } else isHideNicknameAndAvatar = false;
      return isHideNicknameAndAvatar;
    };

    const receiveMessage = (receiveMsg) => {
      const isMe = receiveMsg.sender === localStorage.getItem('uid');
      const userInfo = isMe
        ? [
            {
              uid: receiveMsg.sender,
              nickname: localStorage.getItem('nickname'),
              avatar: localStorage.getItem('avatar'),
            },
          ]
        : connectedUsers.filter((user) => user.uid === receiveMsg.sender);
      if (userInfo.length !== 0) {
        appendMessages({
          uid: userInfo[0].uid,
          nickname: userInfo[0].nickname,
          avatar: userInfo[0].avatar,
          message: receiveMsg.message,
          createdAt: receiveMsg.createdAt,
          type: 'message',
          isHideTime: false,
          isHideNicknameAndAvatar: isHide(messages, receiveMsg),
        });
      } else console.log('[receiveChatting] userInfo가 존재하지 않음');
    };
    roomSocket.off('chatMessage').on('chatMessage', (message) => {
      receiveMessage(message);
    });
  }, [connectedUsers, messages]);
};

export default onChatMessage;
