import styled from 'styled-components';
import ThemeImage from './ThemeImages';
import { ReactComponent as Bar } from '../../assets/svg/Room/Bar.svg';

export default function RoomDetail({ data }) {
  return (
    <>
      <ThemeImage theme={data.theme} />
      <Bar />
      <Attend>
        <div style={{ marginTop: '-0.3rem' }}>🔥</div>
        <div>{data.total}중</div>
        <div>{data.current}명</div>
        <div>참여중</div>
      </Attend>
    </>
  );
}

const Attend = styled.div`
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  height: 100%;
  gap: 0.3rem;
`;
