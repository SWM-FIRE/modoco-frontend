import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-web';
import fireJson from '../../assets/theme/fire.json';
import oceanJson from '../../assets/theme/ocean.json';
import campingJson from '../../assets/theme/camping.json';
import travelJson from '../../assets/theme/travel.json';
import cosmosJson from '../../assets/theme/cosmos.json';

export default function Theme({ theme }: { theme: string }) {
  let themeName;
  let themeJson;
  const themeRef = useRef<HTMLDivElement>(null);

  switch (theme) {
    case 'fire':
      themeName = '모닥불';
      themeJson = fireJson;
      break;
    case 'ocean':
      themeName = '바다';
      themeJson = oceanJson;
      break;
    case 'camping':
      themeName = '캠핑';
      themeJson = campingJson;
      break;
    case 'cosmos':
      themeName = '우주인';
      themeJson = cosmosJson;
      break;
    case 'travel':
      themeName = '여행';
      themeJson = travelJson;
      break;
    default:
      themeName = '모닥불';
      themeJson = fireJson;
  }

  useEffect(() => {
    Lottie.loadAnimation({
      container: themeRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: themeJson,
    });
  }, []);
  return (
    <Component>
      <ThemeImage>
        <div ref={themeRef} />
      </ThemeImage>
      <Name>{themeName}</Name>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const ThemeImage = styled.div`
  width: 2rem;
  height: 2rem;
  div {
    width: 100%;
    height: 100%;
  }
`;

const Name = styled.span`
  font-family: IBMPlexMonoRegular;
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.8);
`;
