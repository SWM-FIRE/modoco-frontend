import styled from 'styled-components';
import UserStore from '../../stores/userStore';
import MyAvatar from '../../assets/avatar/MyAvatar';

export default function Header({ modalHandler }: { modalHandler: () => void }) {
  const { nickname, avatar } = UserStore();
  console.log('avatar ', localStorage.getItem('avatar'));
  return (
    <Container>
      <Logo>modoco</Logo>
      <Profile onClick={modalHandler}>
        <AvatarContainer>
          <MyAvatar num={Number(avatar)} />
        </AvatarContainer>
        {nickname}
      </Profile>
    </Container>
  );
}

const Logo = styled.div`
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
    width: 100%;
    height: 100%;
  }
`;

const Profile = styled.div`
  right: 4rem;
  position: absolute;
  height: 4rem;
  width: 9rem;
  border-radius: 4.8rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
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
