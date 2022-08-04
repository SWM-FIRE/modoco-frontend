import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import FireJson from '../../assets/theme/fire.json';
import OceanJson from '../../assets/theme/ocean.json';
import CosmosJson from '../../assets/theme/cosmos.json';
import TraveelJson from '../../assets/theme/travel.json';
import CampingJson from '../../assets/theme/camping.json';

export default function MovingTheme({
  theme,
  size,
}: {
  theme: string;
  size: string;
}) {
  const themeRef = useRef<HTMLDivElement>(null);
  let myTheme: object;
  let viewBoxSize: string;

  switch (theme) {
    case 'fire':
      myTheme = FireJson;
      viewBoxSize = '0 0 500 500';
      break;
    case 'ocean':
      myTheme = OceanJson;
      viewBoxSize = '0 0 360 360';
      break;
    case 'cosmos':
      myTheme = CosmosJson;
      viewBoxSize = '400 0 1100 1100';
      break;
    case 'camping':
      myTheme = CampingJson;
      viewBoxSize = '250 50 1100 1100';
      break;
    case 'travel':
      myTheme = TraveelJson;
      viewBoxSize = '250 50 1100 1100';
      break;
    default:
      myTheme = FireJson;
      break;
  }

  useEffect(() => {
    Lottie.loadAnimation({
      container: themeRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: myTheme,
      rendererSettings: {
        viewBoxOnly: true,
        viewBoxSize,
      },
    });
  }, []);
  return (
    <Image size={size}>
      <File ref={themeRef} />
    </Image>
  );
}

const File = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const Image = styled.div<{ size: string }>`
  width: ${(props) => `${props.size}rem`}; // change image size
  height: ${(props) => `${props.size}rem`};
  position: relative;
`;
