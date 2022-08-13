import styled from 'styled-components';

export default function Loading() {
  return <LoadingBar />;
}

const LoadingBar = styled.div`
  width: 10rem;
  height: 10rem;
  border-top: 1rem solid;
  border-bottom: 1rem solid;
  border-right: 1rem solid white;
  border-left: 1rem solid white;
  animation: loadingBar 0.75s ease infinite;
  border-radius: 100%;
  @keyframes loadingBar {
    to {
      transform: rotate(180deg);
    }
  }
`;
