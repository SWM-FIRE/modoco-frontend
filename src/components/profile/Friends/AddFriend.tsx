import styled from 'styled-components';
import media from 'src/styles/media';
import useFriends from 'src/hooks/friend/useFriends';
import Avatar from '../../atoms/Avatar';
import AcceptOrDecline from './AcceptOrDecline';

export default function AddFriend() {
  const { isLoading, error, data } = useFriends();
  if (isLoading) return <>loading</>;
  if (error) return <>error</>;
  const pendingFriends = data.filter((friend) => friend.status === 'PENDING');
  const RECV = 'RECEIVER';

  return (
    <>
      {pendingFriends.map((friend, index) => (
        <Component key={Symbol(index).toString()}>
          {friend.role === RECV ? (
            <Avatar avatar={friend.sender.avatar} size={4} />
          ) : (
            <Avatar avatar={friend.receiver.avatar} size={4} />
          )}
          <Contents>
            <Nickname>
              {friend.role === RECV
                ? friend.sender.nickname
                : friend.receiver.nickname}
            </Nickname>
            {friend.role === RECV ? (
              <AcceptOrDecline friend={friend.sender} />
            ) : (
              <Text>친구신청 보냄</Text>
            )}
          </Contents>
        </Component>
      ))}
    </>
  );
}

const Component = styled.div`
  display: flex;
  margin-top: 2.8rem;
`;

const Contents = styled.div`
  margin-left: 1rem;
`;

const Nickname = styled.div`
  font-size: 1.5rem;
  color: #f9fafb;
`;

const Text = styled.p`
  margin-top: 0.2rem;
  margin-left: 0.5rem;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  ${media.small} {
    margin-left: 0.4rem;
    font-size: 1.4rem;
  }
`;
