import styled from 'styled-components';
import MyAvatar from '../../assets/avatar/MyAvatar';
// import { ReactComponent as MicOff } from '../../assets/svg/SmallMicOff.svg';
import { ReactComponent as MicOn } from '../../assets/svg/SmallMicOn.svg';

export default function SingleParticipant({
  nickname,
  avatar,
}: {
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
      <NameContainer>{nickname}</NameContainer>
    </Container>
  );
}

const AvatarContainer = styled.div`
  position: relative;
`;

const MicContainer = styled.div`
  svg {
    width: 100%;
  }
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 100%;
  background-color: #1f2937;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  /* background-color: gray; */
  width: 6.8rem;
  svg {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;

const NameContainer = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 2.2rem;
  color: #f9fafb;
`;
