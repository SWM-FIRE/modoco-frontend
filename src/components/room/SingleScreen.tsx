import styled from 'styled-components';
import MyAvatar from '../../assets/avatar/MyAvatar';

export default function SingkleScreen({
  nickname,
  avatar,
}: {
  nickname: string;
  avatar: string;
}) {
  return (
    <Screen>
      <AvatarPosition>
        <MyAvatar num={Number(avatar)} />
        <NameContainer>{nickname}</NameContainer>
      </AvatarPosition>
    </Screen>
  );
}

const NameContainer = styled.div`
  padding: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-family: IBMPlexSansKRRegular;
  color: #f9fafb;
`;

const AvatarPosition = styled.div`
  bottom: calc(-5% - 4rem);
  height: calc(10% + 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    height: 100%;
  }
  position: absolute;
`;

const Screen = styled.div`
  background-color: #4a4a4a;
  display: flex;
  justify-content: center;
  @media (max-width: 900px) {
    width: 60%;
    height: 0;
    padding-bottom: 38%;
  }
  width: 36%;
  height: 0;
  border-radius: 1rem;
  padding-bottom: 22%;
  position: relative;
`;
