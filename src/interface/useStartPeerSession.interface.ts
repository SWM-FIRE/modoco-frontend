import { RefObject } from 'react';

export default interface useStartPeerSession {
  room: any;
  userMediaStream: any;
  localVideoRef: RefObject<HTMLVideoElement> | null;
}
