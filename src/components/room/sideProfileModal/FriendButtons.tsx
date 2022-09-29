import styled from 'styled-components';
import DecidedFriend from './DecidedFriend';

export default function FriendButtons({ data, toggle }) {
  return (
    <Container>
      <DecidedFriend data={data} toggle={toggle} />

      {/* <Follow>
        <ExistingUser>
          <Status />
          `모도코 열심히 하자`방에 입장중
        </ExistingUser>
        <FollowButton>따라가기</FollowButton>
      </Follow> */}
    </Container>
  );
}

// const ExistingUser = styled.div`
//   display: flex;
//   gap: 0.4rem;
//   align-items: center;
//   justify-content: center;
// `;

// const Status = styled.div`
//   width: 0.8rem;
//   height: 0.8rem;
//   border-radius: 50%;
//   background: #84cc16;
// `;

// const FollowButton = styled.button`
//   padding: 0.8rem 1.2rem;
//   border: 1px solid #ffffff;
//   border-radius: 5rem;
//   color: #f9fafb;
// `;

// const Follow = styled.div`
//   margin-top: 1.6rem;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: 100%;
// `;

const Container = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-weight: 500;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
`;
