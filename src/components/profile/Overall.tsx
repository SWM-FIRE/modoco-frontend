import styled from 'styled-components';

export default function Overall({ isMe }) {
  return (
    <Components>
      <Title>입장했던 방</Title>
      <Ready isMe={isMe}>준비중입니다</Ready>
    </Components>
  );
}

const Components = styled.div`
  width: 100%;
  color: #f9fafb;
`;

const Title = styled.h1`
  font-size: 4rem;
`;

const Ready = styled.div<{ isMe: boolean }>`
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
