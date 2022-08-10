import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import UserStore from '../../stores/userStore';
import MyAvatar from '../../assets/avatar/MyAvatar';
import LoginModalStore from '../../stores/loginModalStore';

export default function Header() {
  const { nickname, avatar } = UserStore();
  const { openModal } = LoginModalStore();
  const navigate = useNavigate();

  const clickLogo = () => {
    navigate('/#/');
  };

  return (
    <Container>
      <Logo onClick={clickLogo}>modoco</Logo>
      {nickname ? (
        <Profile onClick={openModal}>
          <AvatarContainer>
            <MyAvatar num={Number(avatar)} />
          </AvatarContainer>
          {nickname}
        </Profile>
      ) : (
        <Login onClick={openModal}>로그인</Login>
      )}
    </Container>
  );
}

const Login = styled.button`
  width: 9.1rem;
  height: 4.8rem;
  border: 2px solid #494e5b;
  border-radius: 0.8rem;
  cursor: pointer;
  color: #fcfcf9;
  font-size: 1.6rem;
  font-family: IBMPlexSansKRRegular;
  font-weight: 700;
`;

const Logo = styled.div`
  cursor: pointer;
  font-size: 3.2rem;
  font-family: IBMPlexSansKRRegular, Arial;
  color: white;
  font-weight: 700;
`;

const AvatarContainer = styled.div`
  height: 4rem;
  svg {
    height: 100%;
  }
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: IBMPlexSansKRRegular;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
`;

const Container = styled.header`
  width: 100vw;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid #2b2e41 0.1rem;
  padding: 0 4.4rem;
  background-color: #18181b;
`;
