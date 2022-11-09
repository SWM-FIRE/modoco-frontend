/* eslint-disable no-unused-vars */
import { io } from 'socket.io-client';
import directMessage, {
  newMessageInterface,
  message,
} from 'src/interface/directMessage.interface';
import { getDate } from '../utils/getDate';
import { API } from '../config';

const friendSocket = { socket: null };

const generateFriend = () => {
  if (!friendSocket.socket)
    friendSocket.socket = localStorage.getItem('access_token')
      ? io(`${API.SOCKET_FRIEND as string}`, {
          transports: ['websocket', 'polling'],
          query: { token: localStorage.getItem('access_token') },
        })
      : null;
};

const deleteSocket = () => {
  friendSocket.socket = null;
};

const syncFriend = (
  setMessage: ({
    uid,
    messages,
  }: {
    uid: number;
    messages: newMessageInterface[];
  }) => void,
) => {
  friendSocket.socket?.on('friend:sync-all', (data: directMessage[]) => {
    data.forEach((singleData) => {
      if (singleData.messages.length === 0) {
        setMessage({
          uid: singleData.friend.uid,
          messages: [],
        });
        return;
      }
      // 가장 최근에 온 순서로 정렬
      const filteredMessage = singleData.messages
        ? singleData.messages.sort((a, b) => {
            return Number(a.createdAt) - Number(b.createdAt);
          })
        : [];

      // 채팅을 보낼 때 같은 군집으로 보낼지 여부를 결정
      // 앞의 message와 비교해서 내가 저번에 보냈고, 같은 분에 속해있다면 true 아니면 false

      const newMessageType: newMessageInterface[] = [];
      newMessageType.push({
        ...filteredMessage[0],
        isHide: false,
        hideTime: false,
      });

      for (let i = 1; i < filteredMessage.length; i += 1) {
        const prev = filteredMessage[i - 1];
        const cur = filteredMessage[i];

        const {
          day: prevDay,
          hour: prevHour,
          min: prevMin,
        } = getDate(prev.createdAt);
        const {
          day: curDay,
          hour: curHour,
          min: curMin,
        } = getDate(cur.createdAt);

        if (
          cur.from === prev.from &&
          cur.to === prev.to &&
          curDay === prevDay &&
          curHour === prevHour &&
          curMin === prevMin
        ) {
          newMessageType.push({ ...cur, isHide: true, hideTime: false });
          newMessageType[i - 1].hideTime = true;
        } else {
          newMessageType.push({ ...cur, isHide: false, hideTime: false });
        }
      }

      newMessageType.reverse();

      setMessage({
        uid: singleData.friend.uid,
        messages: newMessageType,
      });
    });
  });
};

const recvDirectMessage = (
  setMessages: ({
    uid,
    messages,
  }: {
    uid: number;
    messages: newMessageInterface[];
  }) => void,
  uid: number,
  messages: { [key: string]: newMessageInterface[] },
) => {
  friendSocket.socket?.on('directMessage', (data: message) => {
    const targetUid = data.from === uid ? data.to : data.from;
    const myChatRoom = messages[targetUid];

    // 채팅방에 메세지가 없었을 때
    if (myChatRoom.length === 0) {
      setMessages({
        uid: targetUid,
        messages: [
          {
            ...data,
            isHide: false,
            hideTime: false,
          },
        ],
      });
      return;
    }

    const {
      day: prevDay,
      hour: prevHour,
      min: prevMin,
    } = getDate(messages[targetUid][0].createdAt);
    const { day: curDay, hour: curHour, min: curMin } = getDate(data.createdAt);

    if (
      data.from === messages[targetUid][0].from &&
      data.to === messages[targetUid][0].to &&
      curDay === prevDay &&
      curHour === prevHour &&
      curMin === prevMin
    ) {
      myChatRoom.unshift({ ...data, isHide: true, hideTime: false });
      myChatRoom[1].hideTime = true;
    } else {
      myChatRoom.unshift({ ...data, isHide: false, hideTime: false });
    }

    setMessages({
      uid: targetUid,
      messages: myChatRoom,
    });
  });
};

const sendDirectMessage = (message: string, to: number) => {
  friendSocket.socket?.emit('directMessage', {
    message,
    to,
    createdAt: Date.now().toString(),
  });
};

export default friendSocket;

export {
  generateFriend,
  deleteSocket,
  syncFriend,
  recvDirectMessage,
  sendDirectMessage,
};
