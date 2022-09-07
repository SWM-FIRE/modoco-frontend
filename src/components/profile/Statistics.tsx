import styled from 'styled-components';

export default function Statistics({ isMe }) {
  return (
    <Components>
      <Title>코딩 추이</Title>
      <Ready isMe={isMe}>준비중입니다</Ready>
    </Components>
  );
}

const Components = styled.div`
  color: #f9fafb;
  width: 100%;
  min-width: 55rem;
`;

const Title = styled.h1`
  font-size: 4rem;
`;

const Ready = styled.div<{ isMe: boolean }>`
  width: ${(props) => (props.isMe ? '70%' : '100%')};
  height: 43.6rem;
  padding: 3.2rem;
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
