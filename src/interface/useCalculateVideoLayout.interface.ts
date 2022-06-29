import { RefObject } from 'react';

export default interface useCalculateVideoLayout {
  gallery: RefObject<HTMLDivElement>;
  videoCount: number;
  headerHeight: RefObject<HTMLVideoElement>;
}
