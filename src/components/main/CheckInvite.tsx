import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useRoom from 'src/hooks/useRoom';

export default function CheckInvite({
  inviteCode,
  toggleInvite,
}: {
  inviteCode: string;
  toggleInvite: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  const { isLoading, data, error } = useRoom(inviteCode);
  if (isLoading) return null;
  if (error) return null;

  const refuseInvite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.removeItem('inviteId');
    toggleInvite(false);
  };

  const acceptInvite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleInvite(false);
    navigate(`/ready/${inviteCode}`);
  };

  return (
    <Container>
      <Header>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z"
            fill="#fcfcfd"
          />
        </svg>
        <div>유효한 초대를 찾았어요!</div>
        <Title>{data?.title}</Title>
      </Header>
      <Buttons>
        <Button onClick={refuseInvite} color="#ff8e89">
          거절하기
        </Button>
        <Button onClick={acceptInvite} color="#76e8ad">
          수락하기
        </Button>
      </Buttons>
    </Container>
  );
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
`;

const Title = styled.div`
  font-size: 1.8rem;
`;

const Button = styled.button<{ color: string }>`
  padding: 0.6rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
  cursor: pointer;
  &:hover {
    transform: scale(1.04);
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Container = styled.div`
  position: absolute;
  left: 0;
  width: 25rem;
  height: 16rem;
  display: flex;
  flex-direction: column;
  background-color: #353741;
  justify-content: space-between;
  padding: 1rem;
  font-size: 1.5rem;
  color: #fcfcfd;
  font-family: IBMPlexSansKRRegular;
  border-radius: 0 1rem 1rem 0;
  animation: showInvite 0.5s ease forwards;
  @keyframes showInvite {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
`;
