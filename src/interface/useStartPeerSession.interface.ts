import { RefObject } from 'react';

export default interface useStartPeerSession {
  room;
  userMediaStream;
  localVideoRef: RefObject<HTMLVideoElement> | null;
}
