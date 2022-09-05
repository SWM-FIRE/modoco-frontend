import styled from 'styled-components';
import { ReactComponent as ShowFriendState } from '../../../assets/svg/ShowFriendState.svg';

export default function FriendButtons() {
  return (
    <Container>
      <Friend>
        <ShowFriendState />
        나와 친구입니다
      </Friend>
      <Follow>
        <ExistingUser>
          <Status />
          `모도코 열심히 하자`방에 입장중
        </ExistingUser>
        <FollowButton>따라가기</FollowButton>
      </Follow>
      <Kick>내보내기</Kick>
    </Container>
  );
}

const Kick = styled.div`
  margin-top: 1.2rem;
  width: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  font-size: 1.5rem;
  cursor: pointer;
  border: 1px solid #fb7185;
  color: #fb7185;
`;

const ExistingUser = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
`;

const Status = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: #84cc16;
`;

const FollowButton = styled.button`
  padding: 0.8rem 1.2rem;
  border: 1px solid #ffffff;
  border-radius: 5rem;
  color: #f9fafb;
`;

const Follow = styled.div`
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Container = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-weight: 500;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
`;

const Friend = styled.div`
  width: 56%;
  margin-top: 1.6rem;
  padding: 1.2rem 2rem;
  gap: 1rem;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5rem;
  color: #f3f4f6;
  svg {
    width: 1.6rem;
  }
`;
