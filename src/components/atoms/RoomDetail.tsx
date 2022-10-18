import styled from 'styled-components';
import media from 'src/styles/media';
import ThemeImage from './ThemeImages';

export default function RoomDetail({ data }) {
  return (
    <Container data-cy="card-room-detail">
      <ThemeImage theme={data.theme} type="block" />
      <Attend>
        <div style={{ marginTop: '-0.3rem' }}>🔥</div>
        <div>{data.total}중</div>
        <div>{data.current}명</div>
        <div>참여중</div>
      </Attend>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 2rem;
  font-size: 1.4rem;
  font-family: IBMPlexMonoRegular;
  ${media.small} {
    font-size: 1rem;
  }
`;

const Attend = styled.div`
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  height: 100%;
  gap: 0.3rem;
`;
