import styled from 'styled-components';
import { ReactComponent as SendImage } from '../../../assets/svg/MessageSend.svg';
import friendJson from '../../../friend.json';
import Avatar from '../../atoms/Avatar';

export default function FriendList() {
  const friendList = friendJson;

  return (
    <>
      {friendList.map((friend) => (
        <Component key={friend.id}>
          <Avatar avatar={friend.avatar} size={4} />
          <Information>
            <Nickname>{friend.nickname}</Nickname>
            <FriendStatus>
              <OnlineStatus isOnline={friend.state !== ''} />
              {friend.state !== '' ? friend.state : '오프라인'}
            </FriendStatus>
          </Information>
          <SendMessage>
            <SendButton>
              <SendImage />
            </SendButton>
          </SendMessage>
        </Component>
      ))}
    </>
  );
}

const Component = styled.div`
  display: flex;
  align-items: center;
  color: #f9fafb;
  font-size: 1.5rem;
  margin-top: 2.8rem;
  max-width: 28rem;
`;

const Nickname = styled.div`
  font-size: 1.5rem;
  width: 100%;
  overflow: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Information = styled.div`
  margin-left: 1rem;
  flex-grow: 1;
`;

const FriendStatus = styled.div`
  font-size: 1.2rem;
  font-family: IBMPlexSansKRRegular;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(248, 250, 252, 0.1);
  border-radius: 5rem;
  margin-top: 0.8rem;
  padding: 0.2rem 0.8rem;
  width: max-content;
`;

const OnlineStatus = styled.div<{ isOnline: boolean }>`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: ${(props) => (props.isOnline ? '#45B26B' : '#a5a5a5')};
`;

const SendMessage = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
  cursor: pointer;
`;

const SendButton = styled.button`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  svg {
    width: 80%;
    height: 80%;
  }
`;
