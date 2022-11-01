import styled from 'styled-components';
import chattingModalStore from 'src/stores/chattingModalStore';
import useUser from 'src/hooks/useUser';
import MyAvatar from 'src/assets/avatar/MyAvatar';
import userStore from 'src/stores/userStore';
import directMessageStore from 'src/stores/directMessageStore';
import ChattingPortal from './ChattingPortal';
import SendChat from './SendChat';
import SingleDirectChat from './SingleDirectChat';
import { ReactComponent as Close } from '../../../assets/svg/X.svg';

export default function ChattingModal() {
  const { closeChattingModal, chattingFriend } = chattingModalStore();
  const { isLoading, error, data } = useUser(Number(chattingFriend));
  const { messages } = directMessageStore();
  const { uid } = userStore();

  if (isLoading)
    return (
      <ChattingPortal>
        <Outside onClick={closeChattingModal}>
          <Container onClick={(e) => e.stopPropagation()}>
            <Header />
            <Content>{chattingFriend}</Content>
            <Footer>메세지창</Footer>
          </Container>
        </Outside>
      </ChattingPortal>
    );
  if (error)
    return (
      <ChattingPortal>
        <Outside onClick={closeChattingModal}>
          <Container onClick={(e) => e.stopPropagation()}>
            <Header />
            <Content>{chattingFriend}</Content>
            <Footer>메세지창</Footer>
          </Container>
        </Outside>
      </ChattingPortal>
    );

  return (
    <ChattingPortal>
      <Outside onClick={closeChattingModal}>
        <Container onClick={(e) => e.stopPropagation()}>
          <CloseContainer onClick={closeChattingModal}>
            <Close />
          </CloseContainer>
          <Header>
            <Avatar>
              <MyAvatar num={data?.avatar} />
              {data?.nickname}
            </Avatar>
          </Header>
          <Content>
            {Array.isArray(messages[data.uid]) && messages[data.uid].length > 0
              ? messages[data.uid].map((singleChat, index) => {
                  return (
                    <SingleDirectChat
                      key={Symbol(index).toString()}
                      singleChat={singleChat}
                      target={data}
                      me={uid}
                    />
                  );
                })
              : null}
          </Content>
          <Footer>
            <SendChat uid={data?.uid} />
          </Footer>
        </Container>
      </Outside>
    </ChattingPortal>
  );
}

const CloseContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  cursor: pointer;
`;

const Avatar = styled.div`
  display: flex;
  height: 5rem;
  font-size: 1.6rem;
  align-items: center;
  svg {
    height: 100%;
  }
`;

const Outside = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  width: 100%;
  height: 8rem;
  color: white;
  border-bottom: 1px solid #374151;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
  padding-bottom: 2rem;
`;

const Footer = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 30%;
  min-width: 40rem;
  height: 80%;
  min-height: 30rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: #1e1e22;
  padding: 2rem;
  border-radius: 1rem;
`;
