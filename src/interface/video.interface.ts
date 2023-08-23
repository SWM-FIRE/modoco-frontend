export type PermissionName =
  | 'geolocation'
  | 'notifications'
  | 'persistent-storage'
  | 'push'
  | 'screen-wake-lock'
  | 'xr-spatial-tracking';

export interface videoUserInterface {
  nickname: string;
  uid: number;
  avatar: number;
  sid: string;
  enabledVideo: boolean;
  enabledAudio: boolean;
  isAlreadyEntered: boolean;
  volume: number;
}
