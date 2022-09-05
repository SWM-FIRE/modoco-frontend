import styled from 'styled-components';

export default function Statistics() {
  return (
    <Components>
      <Title>코딩 추이</Title>
      <Ready>준비중입니다</Ready>
    </Components>
  );
}

const Components = styled.div`
  width: 92.5rem;
  color: #f9fafb;
  /* @media (max-width: 96rem) {
    width: 100%;
  } */
`;

const Title = styled.h1`
  font-size: 4rem;
`;

const Ready = styled.div`
  width: 92.6rem;
  height: 43.6rem;
  background-color: #6e768f5e;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  color: #f9fafb56;
  margin-top: 1.4rem;
`;
