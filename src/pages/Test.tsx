import styled from 'styled-components';
import { roomConnection } from '../adapters/roomConnection';
import connectedUsersStore from '../stores/connectedUsersStore';

export default function Test() {
  roomConnection();
  //   const people: person[] = [];
  const { connectedUsers } = connectedUsersStore();
  return (
    <Container>
      <Person>
        {connectedUsers?.map((user) => {
          return <div key={user.uid}>{user.nickname}</div>;
        })}
      </Person>
    </Container>
  );
}

const Person = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  height: 100vh;
`;
