import styled from 'styled-components';
import addFriendJson from '../../../addFriend.json';
import Avatar from '../../atoms/Avatar';

export default function AddFriend() {
  return (
    <>
      {addFriendJson.map((friend) => (
        <Component key={friend.requestDate}>
          <Avatar avatar={friend.avatar} size={4} />
          <Contents>
            <Nickname>{friend.nickname}</Nickname>
            <Buttons>
              <AcceptButton>수락</AcceptButton>
              <RejectButton>거절</RejectButton>
            </Buttons>
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

const Buttons = styled.div`
  margin-top: 0.8rem;
`;

const AcceptButton = styled.button`
  color: #34d399;
  border: 1px solid #34d399;
  border-radius: 5rem;
  padding: 0.4rem 1.6rem;
  font-size: 1.5rem;
  cursor: pointer;
`;

const RejectButton = styled.button`
  color: #fb7185;
  border: 1px solid #fb7185;
  border-radius: 5rem;
  padding: 0.4rem 1.6rem;
  font-size: 1.5rem;
  margin-left: 1rem;
  cursor: pointer;
`;
