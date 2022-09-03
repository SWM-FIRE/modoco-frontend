import styled from 'styled-components';
import { ReactComponent as SendImage } from '../../../assets/svg/MessageSend.svg';
import friendJson from '../../../friend.json';
import Avatar from '../Avatar';

export default function FriendList() {
  const friendList = friendJson;

  return (
    <>
      {friendList.map((friend) => (
        <Component key={friend.id}>
          <Avatar avatar={friend.avatar} size={4} />
          <Nickname>{friend.nickname}</Nickname>
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
`;

const Nickname = styled.div`
  margin-left: 1rem;
  font-size: 1.5rem;
`;

const SendMessage = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2.8rem;
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
