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
      console.log({ id, stream });
      callback(stream);
    };

    console.log(this.peerConnections);
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
   * @brief 누구에게 전화를 걸지 RTCSession 생성 후 call
   * @param to 에게 call -> socket 연결
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

  joinRoom(room: string) {
    this.mRoom = room;
    this.socket.emit('joinRoom', room);
  }

  /**
   * @onCallMade 만들어 졌을 때 알려주는 함수
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
  console.log('socket: ', socket);
  return new PeerConnectionSession(socket);
};
