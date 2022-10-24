import styled from 'styled-components';
import ChattingContents from './ChattingContents';

export default function ControlSidebar({
  backgroundColor,
  toggle,
}: {
  backgroundColor: string;
  toggle: () => void;
}) {
  return (
    <Container backgroundColor={backgroundColor} onClick={toggle}>
      <ChattingContents />
    </Container>
  );
}

const Container = styled.div<{ backgroundColor: string }>`
  z-index: 1;
  position: absolute;
  right: 0;
  top: 1.6rem;
  width: 8.6rem;
  height: 6.8rem;
  border-radius: 1rem 0 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: pointer;
  box-shadow: 0px 4px 59px rgba(50, 50, 71, 0.3);
`;
