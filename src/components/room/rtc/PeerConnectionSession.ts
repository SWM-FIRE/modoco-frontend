/* eslint-disable lines-between-class-members */
import { Socket, io } from 'socket.io-client';

const { RTCPeerConnection, RTCSessionDescription } = window;

class PeerConnectionSession {
  mOnConnected: any;
  mOnDisconnected: any;
  mRoom: any;
  peerConnections: { [key: string]: any } = {};
  senders: any = [];
  listeners: { [key: string]: any } = {};
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
    this.onCallMade();
  }

  addPeerConnection(id: any, stream: any, callback: any) {
    this.peerConnections[id] = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    stream.getTracks().forEach((track: any) => {
      this.senders.push(this.peerConnections[id].addTrack(track, stream));
    });

    this.listeners[id] = (event: any) => {
      let fn;
      if (this.peerConnections[id].connectionState === 'connected') {
        fn = this.mOnConnected;
      } else if (this.peerConnections[id].connectionState === 'disconnected') {
        fn = this.mOnDisconnected;
      } else {
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
      streams: any;
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

  onConnected(callback: any) {
    this.mOnConnected = callback;
  }

  onDisconnected(callback: any) {
    this.mOnDisconnected = callback;
  }

  joinRoom(room: any) {
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

  onAddUser(callback: any) {
    this.socket.on(`${this.mRoom}-add-user`, async ({ user }) => {
      callback(user);
    });
  }

  onRemoveUser(callback: any) {
    this.socket.on(`${this.mRoom}-remove-user`, ({ socketId }) => {
      callback(socketId);
    });
  }

  onUpdateUserList(callback: any) {
    this.socket.on(`${this.mRoom}-update-user-list`, ({ users, current }) => {
      callback(users, current);
    });
  }

  onAnswerMade(callback: any) {
    this.socket.on('answer-made', async (data: any) => {
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
  const socket = io(process.env.REACT_APP_SOCKET_URL as string);

  return new PeerConnectionSession(socket);
};
