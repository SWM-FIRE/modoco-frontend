import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import UserStore from '../../stores/userStore';
import MyAvatar from '../../assets/avatar/MyAvatar';
import LoginModalStore from '../../stores/loginModalStore';
import LogoutModalStore from '../../stores/logoutModalStore';
import LogoutModal from '../logout/LogoutModal';
import { ReactComponent as TopArrow } from '../../assets/svg/topArrow.svg';
import { ReactComponent as BottomArrow } from '../../assets/svg/bottomArrow.svg';

export default function Header() {
  const { nickname, avatar } = UserStore((state) => state);

  const { openLoginModal } = LoginModalStore((state) => state);
  const { isOpenLogoutModal, toggleLogoutModal } = LogoutModalStore();
  const navigate = useNavigate();

  const clickLogo = () => {
    navigate('/#/');
  };

  return (
    <Container>
      <Logo onClick={clickLogo}>modoco</Logo>
      {nickname ? (
        <Profile onClick={toggleLogoutModal}>
          <AvatarContainer>
            <MyAvatar num={Number(avatar)} />
          </AvatarContainer>
          <SvgComponent>
            {isOpenLogoutModal ? <TopArrow /> : <BottomArrow />}
          </SvgComponent>
        </Profile>
      ) : (
        <Login onClick={openLoginModal}>로그인</Login>
      )}
      {isOpenLogoutModal && <LogoutModal />}
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
  width: 4rem;
  margin-left: 0.3rem;
  svg {
    height: 100%;
    width: 100%;
  }
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: IBMPlexSansKRRegular;
  font-size: 1.5rem;
  color: white;
  border: 1px solid #4b5563;
  border-radius: 5rem;
  cursor: pointer;
`;

const SvgComponent = styled.div`
  margin: 1.9rem;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100vw;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid #2b2e41 0.1rem;
  padding: 0 4.4rem;
  position: relative;
  background-color: #18181b;
`;
