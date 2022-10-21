import styled from 'styled-components';
import ChattingContents from './ChattingContents';
import YoutubeContents from './YoutubeContents';

export default function ControlSidebar({
  backgroundColor,
  toggle,
  type,
}: {
  backgroundColor: string;
  toggle: () => void;
  type: string;
}) {
  return (
    <Container backgroundColor={backgroundColor} onClick={toggle} type={type}>
      {type === 'chatting' ? <ChattingContents /> : <YoutubeContents />}
    </Container>
  );
}

const Container = styled.div<{ backgroundColor: string; type: string }>`
  z-index: 1;
  position: absolute;
  right: ${({ type }) => (type === 'chatting' ? '0' : '')};
  left: ${({ type }) => (type === 'youtube' ? '0' : '')};
  top: 1.6rem;
  width: 8.6rem;
  height: 6.8rem;
  border-radius: ${({ type }) =>
    type === 'chatting' ? '1rem 0 0 1rem' : '0 1rem 1rem 0'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: pointer;
  box-shadow: 0px 4px 59px rgba(50, 50, 71, 0.3);
`;
