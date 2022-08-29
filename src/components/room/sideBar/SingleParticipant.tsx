import styled from 'styled-components';
import MyAvatar from '../../../assets/avatar/MyAvatar';
// import { ReactComponent as MicOff } from '../../assets/svg/SmallMicOff.svg';
import { ReactComponent as MicOn } from '../../../assets/svg/SmallMicOn.svg';

export default function SingleParticipant({
  isMe,
  nickname,
  avatar,
}: {
  isMe: boolean;
  nickname: string;
  avatar: string;
}) {
  return (
    <Container>
      <AvatarContainer>
        <MyAvatar num={Number(avatar)} />
        <MicContainer>
          <MicOn />
        </MicContainer>
      </AvatarContainer>
      <NameContainer isMe={isMe} nicknameLength={nickname.length}>
        {nickname}
      </NameContainer>
    </Container>
  );
}

const AvatarContainer = styled.div`
  position: relative;
`;

const MicContainer = styled.div`
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 100%;
  background-color: #1f2937;
  position: absolute;
  bottom: -0.3rem;
  right: -1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
`;

const Container = styled.div`
  width: 4.3rem;
  svg {
    width: 100%;
    height: 100%;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;

const NameContainer = styled.div<{ nicknameLength: number; isMe: boolean }>`
  font-family: IBMPlexSansKRRegular;
  font-weight: 500;
  word-break: break-all;
  font-size: 1.6rem;
  font-size: calc(
    1.6rem -
      ${(props) =>
        props.nicknameLength < 4 ? 0 : props.nicknameLength * 0.05}rem
  );
  color: ${(props) => (props.isMe ? '#A7F3D0' : '#f9fafb')};
`;
