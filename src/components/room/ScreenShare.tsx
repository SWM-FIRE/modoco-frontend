import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SingleScreen from './SingleScreen';
import LocalScreen from './LocalScreen';
import connectedUsersStore from '../../stores/connectedUsersStore';

export default function ScreenShare() {
  const navigate = useNavigate();
  const { connectedUsers } = connectedUsersStore();
  useEffect(() => {
    if (!localStorage.getItem('uid') || !localStorage.getItem('nickname')) {
      alert('로그인 후 이용해주세요');
      navigate('/main');
    }
  }, []);

  return (
    <Container>
      <ScreenWrapper>
        <LocalScreen
          nickname={localStorage.getItem('nickname')}
          avatar={localStorage.getItem('avatar')}
          uid={localStorage.getItem('uid')}
        />
        {connectedUsers.map((user) => (
          <SingleScreen
            key={user.nickname}
            nickname={user.nickname}
            avatar={user.avatar}
            uid={user.uid}
          />
        ))}
      </ScreenWrapper>
    </Container>
  );
}

const ScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  @media (max-width: 900px) {
    flex-direction: column;
    flex-wrap: unset;
    gap: 10%;
  }
  gap: 0 8%;
  height: 100%;
`;

const Container = styled.div`
  margin: 3rem 0 0 1.6rem;
  width: calc(100% - 46.5rem);
  height: calc(100% - 5rem);
`;
