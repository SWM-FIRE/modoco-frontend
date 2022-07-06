/* eslint-disable lines-between-class-members */
import io, { Socket } from 'socket.io-client';

const { RTCPeerConnection, RTCSessionDescription } = window;

class PeerConnectionSession {
  mOnConnected: () => void;
  mOnDisconnected: () => void;
  mRoom: string;
  socket;
  peerConnections = {};
  senders = [];
  listeners = {};

  constructor(socket: Socket) {
    this.socket = socket;
    this.onCallMade();
  }

  /**
   * @brief - 새로운 peer connection을 생성하고, peer connection object에 추가한다
   * @param id
   * @param stream
   * @param callback
   */

  addPeerConnection(
    id: string,
    stream: MediaStream,
    callback: (_stream: MediaStream) => void,
  ) {
    // 새로운 stun 서버에 추가
    this.peerConnections[id] = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    // user의 media track을 추가
    stream.getTracks().forEach((track) => {
      this.senders.push(this.peerConnections[id].addTrack(track, stream));
    });

    // peer의 connection state에 따라 callback 함수 호출
    this.listeners[id] = (event) => {
      let fn;
      if (this.peerConnections[id].connectionState === 'connected') {
        console.log('mOnConnected', this.mOnConnected);
        fn = this.mOnConnected;
      } else if (this.peerConnections[id].connectionState === 'disconnected') {
        console.log('mOnDisconnected', this.mOnDisconnected);
        fn = this.mOnDisconnected;
      } else {
        console.log('mRoom', this.mRoom);
        fn = this.mRoom;
      }
      if (fn === null) {
        fn(event, id);
      }
    };

    // peer의 state 변경할 수 있는 eventListener
    this.peerConnections[id].addEventListener(
      'connectionstatechange',
      this.listeners[id],
    );

    this.peerConnections[id].ontrack = function ({
      streams: [stream],
    }: {
      streams;
    }) {
      console.log({ id, stream });
      callback(stream);
    };

    console.log(this.peerConnections);
  }

  /**
   * @breif 해당하는 peer connection을 삭제
   * @param id 에 해당하는 peer connection 삭제
   *
   */
  removePeerConnection(id: string) {
    this.peerConnections[id].removeEventListener(
      'connectionstatechange',
      this.listeners[id],
    );
    delete this.peerConnections[id];
    delete this.listeners[id];
  }

  isAlreadyCalling = false;

  /**
   * @brief 누구에게 전화를 걸지 RTCSession 생성 후 call
   * @param to 에게 call
   */
  async callUser(to: string) {
    if (this.peerConnections[to].iceConnectionState === 'new') {
      const offer = await this.peerConnections[to].createOffer();
      await this.peerConnections[to].setLocalDescription(
        new RTCSessionDescription(offer),
      );

      this.socket.emit('call-user', { offer, to });
    }
  }

  /**
   * @onConnected @onDisconnected @joinRoom -> state에 따라 callback
   * @param callback
   */

  onConnected(callback: () => void) {
    this.mOnConnected = callback;
  }

  onDisconnected(callback: () => void) {
    this.mOnDisconnected = callback;
  }

  joinRoom(room: string) {
    this.mRoom = room;
    this.socket.emit('joinRoom', room);
  }

  /**
   * call 만들어 졌을 때 알려주는 함수
   */

  onCallMade() {
    this.socket.on('call-made', async (data) => {
      await this.peerConnections[data.socket].setRemoteDescription(
        new RTCSessionDescription(data.offer),
      );
      const answer = await this.peerConnections[data.socket].createAnswer();
      await this.peerConnections[data.socket].setLocalDescription(
        new RTCSessionDescription(answer),
      );

      this.socket.emit('make-answer', {
        answer,
        to: data.socket,
      });
    });
  }

  onAddUser(callback: (_user: string) => void) {
    this.socket.on(`${this.mRoom}-add-user`, async ({ user }) => {
      callback(user);
    });
  }

  onRemoveUser(callback: (_socketId: string) => void) {
    this.socket.on(`${this.mRoom}-remove-user`, ({ socketId }) => {
      callback(socketId);
    });
  }

  onUpdateUserList(callback: (_users: string[], _current: string) => void) {
    this.socket.on(`${this.mRoom}-update-user-list`, ({ users, current }) => {
      callback(users, current);
    });
  }

  onAnswerMade(callback) {
    this.socket.on('answer-made', async (data) => {
      await this.peerConnections[data.socket].setRemoteDescription(
        new RTCSessionDescription(data.answer),
      );
      callback(data.socket);
    });
  }

  clearConnections() {
    this.socket.close();
    this.senders = [];
    Object.keys(this.peerConnections).forEach(
      this.removePeerConnection.bind(this),
    );
  }
}

/**
 *
 * @brief socket 연결
 * @returns {PeerConnectionSession} : 연결된 소켓에 해당하는 class
 */

export const createPeerConnectionContext = () => {
  const socket = io(process.env.REACT_APP_SOCKET_URL as string);
  console.log(socket);
  return new PeerConnectionSession(socket);
};
