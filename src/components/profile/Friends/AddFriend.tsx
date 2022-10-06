import styled from 'styled-components';
import media from 'src/styles/media';
import { detailedFriend } from 'src/interface/singleFriend.interface';
import FriendIcon from './FriendIcon';
import AcceptOrDecline from './AcceptOrDecline';

export default function AddFriend({
  friendList,
}: {
  friendList: detailedFriend[];
}) {
  const RECV = 'RECEIVER';

  return (
    <>
      {friendList.map((friend, index) => (
        <Component key={Symbol(index).toString()}>
          {friend.role === RECV ? (
            <FriendIcon friend={friend.sender} />
          ) : (
            <FriendIcon friend={friend.receiver} />
          )}
          <Contents>
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
  align-items: center;
  justify-content: space-between;
  margin-top: 2.8rem;
  max-width: 28rem;
`;

const Contents = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15rem;
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
