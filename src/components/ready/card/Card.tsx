import styled from 'styled-components';
import useRoom from '../../../hooks/useRoom';
import Header from './Header';
import Title from './Title';
import Loading from '../../atoms/Loading';
import Tags from './Tags';
import RoomDetail from '../../atoms/RoomDetail';

export default function Card({ room }) {
  const { isLoading, error, data } = useRoom(room);

  if (isLoading) return <Loading />;
  if (error) return <div>An error has occurred: </div>;

  return (
    <Container>
      <Header data={data} />
      <Detail>
        <Title data={data} />
        <Tags data={data} />
        <PositionRoom>
          <RoomDetail data={data} />
        </PositionRoom>
      </Detail>
    </Container>
  );
}

const PositionRoom = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
`;

const Detail = styled.div`
  margin-top: 4rem;
`;

const Container = styled.div`
  width: 100%;
  padding: 3.2rem 2rem;
`;
