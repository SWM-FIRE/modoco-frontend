import { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import styled from 'styled-components';
import error404 from '../assets/theme/404.json';

export default function NoExist() {
  const errorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: errorRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: error404,
      rendererSettings: {},
    });
  }, []);
  return (
    <Image>
      <ErrorMessage>404 Not Found</ErrorMessage>
      <File ref={errorRef} />
    </Image>
  );
}

const ErrorMessage = styled.div`
  font-family: GmarketSansBold;
  color: white;
  margin-top: 3%;
  font-size: 10rem;
  font-weight: 400;
  font-stretch: normal;
`;

const Image = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18181b;
`;
const File = styled.div`
  width: 60%;
  height: 60%;
`;
