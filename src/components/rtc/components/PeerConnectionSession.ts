/* eslint-disable lines-between-class-members */
import io from 'socket.io-client';

const { RTCPeerConnection, RTCSessionDescription } = window;

class PeerConnectionSession {
  mOnConnected;
  mOnDisconnected;
  mRoom;
  peerConnections = {};
  senders = [];
  listeners = {};
  socket;

  constructor(socket) {
    this.socket = socket;
    this.onCallMade();
  }

  addPeerConnection(id, stream, callback) {
    this.peerConnections[id] = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    stream.getTracks().forEach((track) => {
      this.senders.push(this.peerConnections[id].addTrack(track, stream));
    });

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

  removePeerConnection(id: string) {
    this.peerConnections[id].removeEventListener(
      'connectionstatechange',
      this.listeners[id],
    );
    delete this.peerConnections[id];
    delete this.listeners[id];
  }

  isAlreadyCalling = false;

  async callUser(to: string) {
    if (this.peerConnections[to].iceConnectionState === 'new') {
      const offer = await this.peerConnections[to].createOffer();
      await this.peerConnections[to].setLocalDescription(
        new RTCSessionDescription(offer),
      );

      this.socket.emit('call-user', { offer, to });
    }
  }

  onConnected(callback) {
    this.mOnConnected = callback;
  }

  onDisconnected(callback) {
    this.mOnDisconnected = callback;
  }

  joinRoom(room) {
    this.mRoom = room;
    this.socket.emit('joinRoom', room);
  }

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

  onAddUser(callback) {
    this.socket.on(`${this.mRoom}-add-user`, async ({ user }) => {
      callback(user);
    });
  }

  onRemoveUser(callback) {
    this.socket.on(`${this.mRoom}-remove-user`, ({ socketId }) => {
      callback(socketId);
    });
  }

  onUpdateUserList(callback) {
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

export const createPeerConnectionContext = () => {
  const socket = io('http://172.16.101.93:8282/room');
  console.log(socket);
  return new PeerConnectionSession(socket);
};
