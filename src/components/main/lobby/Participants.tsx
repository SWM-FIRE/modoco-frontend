import styled from 'styled-components';
import SingleParticipant from './SingleParticipant';

export default function Participants({ connectedUsers }) {
  return (
    <Container>
      {connectedUsers.map((user) => {
        return <SingleParticipant user={user} key={user.uid} />;
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: calc(100% - 6rem);
  overflow: auto;
  margin-top: 1rem;
`;
