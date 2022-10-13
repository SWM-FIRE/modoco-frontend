import styled from 'styled-components';

export default function Ready({ isMe }: { isMe: boolean }) {
  return <Component isMe={isMe}>준비중입니다</Component>;
}

const Component = styled.div<{ isMe: boolean }>`
  width: ${(props) => (props.isMe ? '70%' : '100%')};
  padding: 3.2rem;
  height: 43.6rem;
  background-color: #6e768f5e;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  color: #f9fafb56;
  margin-top: 1.4rem;
  @media (max-width: 1020px) {
    width: 100%;
  }
`;
