import styled from 'styled-components';
import chattingModalStore from 'src/stores/chattingModalStore';
import useUser from 'src/hooks/useUser';
import MyAvatar from 'src/assets/avatar/MyAvatar';
import userStore from 'src/stores/userStore';
import directMessageStore from 'src/stores/directMessageStore';
import { newMessageInterface } from 'src/interface/directMessage.interface';
import ChattingPortal from './ChattingPortal';
import SendChat from './SendChat';
import SingleDirectChat from './SingleDirectChat';
import { ReactComponent as Close } from '../../../assets/svg/X.svg';

export default function ChattingModal() {
  const { closeChattingModal, chattingFriend } = chattingModalStore();
  const { isLoading, error, data } = useUser(Number(chattingFriend));
  const { messages } = directMessageStore();
  const { uid } = userStore();

  const filteredMessage = messages[chattingFriend]
    ? messages[chattingFriend].sort((a, b) => {
        return Number(a.createdAt) - Number(b.createdAt);
      })
    : [];

  // 채팅을 보낼 때 같은 군집으로 보낼지 여부를 결정
  // 앞의 message와 비교해서 내가 저번에 보냈고, 같은 분에 속해있다면 true 아니면 false
  const newMessageType: newMessageInterface[] = [];
  newMessageType.push({
    ...filteredMessage[0],
    isHide: false,
    hideTime: false,
  });
  for (let i = 1; i < filteredMessage.length; i += 1) {
    const prev = filteredMessage[i - 1];
    const cur = filteredMessage[i];

    const prevDay = new Date(Number(prev.createdAt)).getDate();
    const curDay = new Date(Number(cur.createdAt)).getDate();
    const prevHour = new Date(Number(prev.createdAt)).getHours();
    const curHour = new Date(Number(cur.createdAt)).getHours();
    const prevMin = new Date(Number(prev.createdAt)).getMinutes();
    const curMin = new Date(Number(cur.createdAt)).getMinutes();

    if (
      cur.from === prev.from &&
      cur.to === prev.to &&
      curDay === prevDay &&
      curHour === prevHour &&
      curMin === prevMin
    ) {
      newMessageType.push({ ...cur, isHide: true, hideTime: false });
      newMessageType[i - 1].hideTime = true;
    } else {
      newMessageType.push({ ...cur, isHide: false, hideTime: false });
    }
  }
  newMessageType.reverse();

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
            {newMessageType.map((singleChat, index) => {
              return (
                <SingleDirectChat
                  key={Symbol(index).toString()}
                  singleChat={singleChat}
                  target={data}
                  me={uid}
                />
              );
            })}
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
