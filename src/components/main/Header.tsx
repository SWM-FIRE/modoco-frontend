import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import UserStore from '../../stores/userStore';
import MyAvatar from '../../assets/avatar/MyAvatar';

export default function Header({ modalHandler }: { modalHandler: () => void }) {
  const { nickname, avatar } = UserStore();
  const navigate = useNavigate();

  const clickLogo = () => {
    navigate('/#/');
  };
  return (
    <Container>
      <Logo onClick={clickLogo}>modoco</Logo>
      {nickname ? (
        <Profile onClick={modalHandler}>
          <AvatarContainer>
            <MyAvatar num={Number(avatar)} />
          </AvatarContainer>
          {nickname}
        </Profile>
      ) : (
        <Login onClick={modalHandler}>로그인</Login>
      )}
    </Container>
  );
}

const Login = styled.button`
  position: absolute;
  right: 5rem;
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
  font-size: 2.4rem;
  position: absolute;
  width: 9.2rem;
  height: 2.2rem;
  font-family: PretendardRegular, Arial;
  color: white;
  left: 4rem;
`;

const AvatarContainer = styled.div`
  height: 4rem;
  svg {
    height: 100%;
  }
`;

const Profile = styled.div`
  right: 4rem;
  position: absolute;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: IBMPlexSansKRRegular;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
`;

const Container = styled.div`
  width: 100vw;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid #2b2e41 0.1rem;
`;
