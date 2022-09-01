import styled from 'styled-components';

export default function Buttons({ isMe }: { isMe: boolean }) {
  return (
    <Container>
      {isMe ? (
        <MyPage>마이 페이지</MyPage>
      ) : (
        <>
          <FriendRequest>친구요청</FriendRequest>
          <Kick>내보내기</Kick>
        </>
      )}
    </Container>
  );
}

const MyPage = styled.button`
  padding: 0.8rem 1.2rem;
  border: 0.1rem solid #ffffff;
  color: #f9fafb;
`;

const FriendRequest = styled.button`
  background-color: #ffffff;
  color: #111827;
`;

const Kick = styled.button`
  border: 1px solid #fb7185;
  color: #fb7185;
`;

const Container = styled.div`
  margin-top: 1.6rem;
  width: 100%;
  line-height: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.8rem;
  button {
    font-family: IBMPlexSansKRRegular;
    font-style: normal;
    font-weight: 500;
    font-size: 1.3rem;
    border-radius: 5rem;
    padding: 1.2rem 2rem;
    cursor: pointer;
  }
`;
