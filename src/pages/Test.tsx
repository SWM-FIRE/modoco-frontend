import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import FireJson from '../assets/theme/fire.json';
import OceanJson from '../assets/theme/ocean.json';
import CosmosJson from '../assets/theme/cosmos.json';
import TravelJson from '../assets/theme/travel.json';
import CampingJson from '../assets/theme/camping.json';

export default function Test() {
  const fireRef = useRef<HTMLDivElement>(null);
  const oceanRef = useRef<HTMLDivElement>(null);
  const cosmosRef = useRef<HTMLDivElement>(null);
  const campingRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: fireRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: FireJson,
      rendererSettings: {
        viewBoxOnly: true,
        viewBoxSize: '0 0 500 500',
      },
    });
    Lottie.loadAnimation({
      container: oceanRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: OceanJson,
      rendererSettings: {
        viewBoxOnly: true,
        viewBoxSize: '0 0 360 360',
      },
    });
    Lottie.loadAnimation({
      container: cosmosRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: CosmosJson,
      rendererSettings: {
        viewBoxOnly: true,
        viewBoxSize: '400 0 1100 1100',
      },
    });
    Lottie.loadAnimation({
      container: campingRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: CampingJson,
      rendererSettings: {
        viewBoxOnly: true,
        viewBoxSize: '250 50 1100 1100',
      },
    });
    Lottie.loadAnimation({
      container: travelRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: TravelJson,
      rendererSettings: {
        viewBoxOnly: true,
        viewBoxSize: '250 50 1100 1100',
      },
    });
  }, []);
  return (
    <Container>
      <Image>
        <File ref={oceanRef} />
      </Image>
      <Image>
        <File ref={campingRef} />
      </Image>
      <Image>
        <File ref={cosmosRef} />
      </Image>
      <Image>
        <File ref={fireRef} />
      </Image>
      <Image>
        <File ref={travelRef} />
      </Image>
    </Container>
  );
}

// const Travel = styled.div`
//   position: absolute;
//   width: 148%;
//   left: -24%;
//   top: -5%;
// `;

// const Cosmos = styled.div`
//   position: absolute;
//   top: -10%;
//   left: -45%;
//   width: 200%;
// `;

// const Camp = styled.div`
//   position: absolute;
//   top: -6%;
//   left: -22%;
//   width: 145%;
// `;

const File = styled.div`
  width: 100%;
`;

const Image = styled.div`
  width: 20rem; // change image size
  height: 20rem;
  position: relative;
  background-color: gray;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #265b60;
  display: flex;
  overflow: auto;
  gap: 5rem;
`;
