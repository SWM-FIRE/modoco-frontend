export default interface VideoUserInterface {
  nickname: string;
  uid: number;
  avatar: number;
  sid: string;
  enabledVideo: boolean;
  enabledAudio: boolean;
  isAlreadyEntered: boolean;
  volume: number;
}
