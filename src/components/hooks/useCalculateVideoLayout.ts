import { useEffect, RefObject } from 'react';
import { calculateLayout } from '../../utils/helper';

export const useCalculateVideoLayout = (
  gallery: RefObject<HTMLDivElement>,
  videoCount: number,
) => {
  useEffect(() => {
    const recalculateLayout = () => {
      const headerHeight =
        document.getElementsByTagName('header')?.[0]?.offsetHeight;
      const aspectRatio = 16 / 9;
      const screenWidth = document.body.getBoundingClientRect().width;
      const screenHeight =
        document.body.getBoundingClientRect().height - headerHeight;

      const { width, height, cols } = calculateLayout(
        screenWidth,
        screenHeight,
        videoCount,
        aspectRatio,
      );

      gallery.current?.style?.setProperty('--width', `${width}px`);
      gallery.current?.style?.setProperty('--height', `${height}px`);
      gallery.current?.style?.setProperty('--cols', `${cols}`);
    };

    recalculateLayout();
    window.addEventListener('resize', recalculateLayout);

    return () => {
      window.removeEventListener('resize', recalculateLayout);
    };
  }, [gallery, videoCount]);
};
