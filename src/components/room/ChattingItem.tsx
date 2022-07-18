import styled from 'styled-components';
import MyAvatar from '../../assets/avatar/MyAvatar';
import messageInterface from '../../interface/message.interface';

export default function ChattingItem({ user, msg, time }: messageInterface) {
  return (
    <Component user={user.nickname}>
      {user.nickname !== '나' && (
        <AvatarComponent>
          <MyAvatar num={Number(user.avatar)} />
        </AvatarComponent>
      )}
      <MessageComponent user={user.nickname}>
        <Nickname user={user.nickname}>{user.nickname}</Nickname>
        <MessageBox user={user.nickname}>
          <Message>{msg}</Message>
          <Time>{time}</Time>
        </MessageBox>
      </MessageComponent>
    </Component>
  );
}

interface userInterface {
  user: string;
}

const Component = styled.li<userInterface>`
  display: flex;
  flex-direction: ${(props) => (props.user === '나' ? 'row-reverse' : 'row')};
  width: 100%;
  gap: 1.6rem;
  margin-top: 2.4rem;
`;

const AvatarComponent = styled.div`
  svg {
    width: 4.8rem;
    height: 4.8rem;
  }
`;

const MessageComponent = styled.div<userInterface>`
  display: flex;
  flex-direction: column;
  align-items: ${({ user }) => (user === '나' ? 'flex-end' : 'flex-start')};
`;

const Nickname = styled.div<userInterface>``;

const MessageBox = styled.div<userInterface>`
  border-radius: ${(props) =>
    props.user === '나' ? '0.8rem 0 0.8rem 0.8rem' : '0 0.8rem 0.8rem 0.8rem'};
  padding: 1.6rem;
  margin-top: 0.4rem;
  background-color: ${(props) =>
    props.user === '나' ? 'rgb(53, 55, 65)' : 'rgb(31, 35, 49)'};
  overflow: hidden;
`;

const Message = styled.div`
  color: rgb(255, 255, 255);
  font-size: 1.5rem;
  width: 100%;
`;

const Time = styled.div`
  font-size: 0.8rem;
  float: right;
  margin-top: 0.2rem;
`;
