import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import FireJson from '../assets/theme/fire.json';
import OceanJson from '../assets/theme/ocean.json';
import CosmosJson from '../assets/theme/cosmos.json';
import CampingJson from '../assets/theme/camping.json';

export default function Test() {
  const fireRef = useRef<HTMLDivElement>(null);
  const oceanRef = useRef<HTMLDivElement>(null);
  const cosmosRef = useRef<HTMLDivElement>(null);
  const campingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: fireRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: FireJson,
    });
    Lottie.loadAnimation({
      container: oceanRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: OceanJson,
    });
    Lottie.loadAnimation({
      container: cosmosRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: CosmosJson,
    });
    Lottie.loadAnimation({
      container: campingRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: CampingJson,
    });
  }, []);
  return (
    <Container>
      <Image>
        <File ref={oceanRef} />
      </Image>
      <Image>
        <Camp ref={campingRef} />
      </Image>
      <Image>
        <Cosmos ref={cosmosRef} />
      </Image>
      <Image>
        <File ref={fireRef} />
      </Image>
    </Container>
  );
}

const Cosmos = styled.div`
  position: absolute;
  top: -10%;
  left: -45%;
  width: 200%;
`;

const Camp = styled.div`
  position: absolute;
  top: -6%;
  left: -22%;
  width: 145%;
`;

const File = styled.div`
  width: 100%;
`;

const Image = styled.div`
  width: 20rem; // change image size
  background-color: gray;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;
