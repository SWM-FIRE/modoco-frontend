import styled from 'styled-components';
import MyAvatar from 'src/assets/avatar/MyAvatar';
import useEnterProfile from '../useEnterProfile';

export default function SingleParticipant({ user }) {
  const { enterProfile } = useEnterProfile(user.uid);

  return (
    <User onClick={enterProfile}>
      <AvatarContainer>
        <MyAvatar num={user.avatar} />
      </AvatarContainer>
      <Nickname>{user.nickname}</Nickname>
    </User>
  );
}

const AvatarContainer = styled.div`
  width: 4rem;
  height: 4rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
    p {
      text-decoration: underline;
    }
  }
`;

const Nickname = styled.p`
  font-size: 1.3rem;
  color: #9ca3af;
`;
