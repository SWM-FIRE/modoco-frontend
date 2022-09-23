import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import useMe from 'src/hooks/useMe';
import { AxiosError } from 'axios';
import LoginModal from '../components/login/LoginModal';

export default function Invite() {
  const { inviteId } = useParams();
  localStorage.setItem('inviteId', inviteId);
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  // need to sign up
  if (!token) {
    console.log('no token!');
  }

  const { isLoading, error, data } = useMe(token);

  // loading to fetch
  if (isLoading) return <Container />;

  // when fetched wrong
  if (error instanceof AxiosError) {
    if (!token) {
      console.log('no token!');
    } else if (error.response.status === 401) {
      console.log('token expired!');
    } else {
      console.error('error not valid');
    }
    return (
      <Container>
        <LoginModal />
      </Container>
    );
  }
  // when fetched data is valid
  if (data.uid) {
    navigate(`/ready/${inviteId}`);
  }
  return <Container />;
}

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  color: white;
`;
