/* eslint-disable lines-between-class-members */
import io, { Socket } from 'socket.io-client';

const { RTCPeerConnection, RTCSessionDescription } = window;

class PeerConnectionSession {
  mRoom: string;
  socket: Socket;
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

    // peerConnection의 track마다 생성된 stream을 callback함수로 전달
    this.peerConnections[id].ontrack = ({ streams: [stream] }) => {
      callback(stream);
    };
    // end of addPeerConnection
  }

  /**
   * @breif 해당하는 peer connection을 삭제
   * @param id 에 해당하는 peer connection 삭제
   * 해당하는 peerConnection의 eventListener를 삭제
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
   * @brief pc1에서 offer 생성 후 setLocalDescription하는 함수
   * - 이후 pc2에게 offer 보냄
   * - pc1 브라우저에서 실행됨
   * @param pc2
   */
  async callUser(to: string) {
    if (this.peerConnections[to].iceConnectionState === 'new') {
      // 다른 사람이 참여할 수 있게 offer 생성, 일종의 초대장?
      const offer = await this.peerConnections[to].createOffer();
      console.log('pc2에게 보낼 offer 생성');

      await this.peerConnections[to].setLocalDescription(
        new RTCSessionDescription(offer),
      );
      this.socket.emit('call-user', { offer, to });
      console.log('signaling server에 send offer');
    }
  }

  /**
   * @onConnected @onDisconnected @joinRoom -> state에 따라 callback
   * @param callback
   */

  joinRoom(room: string) {
    this.mRoom = room;
    this.socket.emit('joinRoom', room);
  }

  /**
   * @onCallMade pc2가 pc1이 보낸 offer를 받을 때 실행
   * setRemoteDescription실행
   * - pc2의 브라우저에서 실행됨
   */

  onCallMade() {
    this.socket.on('call-made', async (data) => {
      console.log('pc1이 보낸 offer를 pc2가 받음');
      await this.peerConnections[data.socket].setRemoteDescription(
        new RTCSessionDescription(data.offer),
      );
      const answer = await this.peerConnections[data.socket].createAnswer();
      console.log('pc2가 answer 생성');
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

  onAnswerMade(callback: (_answer: string) => void) {
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
  console.log('4. socket', socket);
  return new PeerConnectionSession(socket);
};
