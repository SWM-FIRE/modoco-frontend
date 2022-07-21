import styled from 'styled-components';
import MyAvatar from '../../assets/avatar/MyAvatar';
import controlModal from '../../stores/controlModal';

export default function SingleScreen({
  nickname,
  avatar,
}: {
  nickname: string;
  avatar: string;
}) {
  const { toggleModal, setNickname, setAvatar } = controlModal();
  const OpenModal = () => {
    setNickname(nickname);
    setAvatar(avatar);
    toggleModal();
  };
  return (
    <Container onClick={OpenModal}>
      <ChatContainer>
        <ChatInner>
          <Chats>Lorem ipsum dolor sit amet,</Chats>
          <Chats>Vestibulum sit amet tellus suscipit</Chats>
          <Chats>
            Fusce eget lacus eu magna finibus interdum vel vel felis.
          </Chats>
          <Chats>Last Chat</Chats>
        </ChatInner>
      </ChatContainer>
      <AvatarPosition>
        <MyAvatar num={Number(avatar)} />
        <NameContainer>{nickname}</NameContainer>
      </AvatarPosition>
    </Container>
  );
}

const ChatInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  gap: 1rem;
`;

const ChatContainer = styled.div`
  width: calc(100% - 3rem);
  height: calc(95% - 3rem);
  position: absolute;
  bottom: calc(5% + 3rem);
  overflow: hidden;
  margin-left: 1.2rem;
`;

const Chats = styled.div`
  align-self: flex-start;
  padding: 1.6rem;
  background-color: rgba(53, 69, 122, 0.8);
  font-family: IBMPlexSansKRRegular;
  font-weight: 400;
  border-radius: 0.8rem;
  font-size: 15px;
  line-height: 22px;
  color: #ffffff;
`;

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

const Container = styled.div`
  cursor: pointer;
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
