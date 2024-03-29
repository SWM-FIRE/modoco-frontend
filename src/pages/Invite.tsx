import { useCallback } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import useMe from 'src/hooks/useMe';
import { AxiosError } from 'axios';
import LoginModal from '../components/login/LoginModal';
import Screen from '../components/invite/Screen';
import RoomDetail from '../components/invite/RoomDetail';
import loginModalStore from '../stores/loginModalStore';

export default function Invite() {
  const { inviteId } = useParams();
  const navigate = useNavigate();
  const { setLoginModal } = loginModalStore();
  const token = localStorage.getItem('access_token');

  const urlSearch = new URLSearchParams(window.location.search);
  const password = urlSearch.get('pw');
  if (password) localStorage.setItem(`${inviteId}`, password);

  localStorage.setItem('inviteId', inviteId);
  const { isLoading, error, data } = useMe();

  const closeLoginModal = useCallback(() => {
    setLoginModal(false);
  }, [setLoginModal]);

  // loading to fetch
  if (isLoading) return <Container />;

  // when fetch error occurred
  // no login info
  if (error instanceof AxiosError) {
    // save invitation code
    if (!token) {
      console.log('no token!');
    } else if (error.response.status === 401) {
      console.log('token expired!');
    } else {
      console.error('error not valid');
    }
    return (
      <Container>
        <LoginModal closeLoginModal={closeLoginModal} />
        <Main>
          <Screen />
          <RoomDetail />
        </Main>
      </Container>
    );
  }
  // when fetched data is valid
  if (data) {
    navigate(`/ready/${inviteId}`);
  }
  return <Container />;
}

const Main = styled.div`
  display: flex;
  width: 106rem;
  height: 56.8rem;
  justify-content: space-between;
  margin-top: 11rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #18181b;
`;
