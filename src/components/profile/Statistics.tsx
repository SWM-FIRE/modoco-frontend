import { useState } from 'react';
import styled from 'styled-components';
import Chart from './Chart/Chart';

export default function Statistics({ isMe }) {
  const [selectedType, setSelectedType] = useState('Day');
  const onClickTab = (e) => {
    setSelectedType(e.target.innerText);
  };
  return (
    <Components>
      <Title>코딩 추이</Title>
      <Contents isMe={isMe}>
        <Tabs>
          <Type onClick={onClickTab} isOnClicked={selectedType === 'Day'}>
            Day
          </Type>
          <Type onClick={onClickTab} isOnClicked={selectedType === 'Week'}>
            Week
          </Type>
          <Type onClick={onClickTab} isOnClicked={selectedType === 'Month'}>
            Month
          </Type>
        </Tabs>
        <Chart type={selectedType} />
      </Contents>
    </Components>
  );
}

const Components = styled.div`
  color: #f9fafb;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 4rem;
`;

const Contents = styled.div<{ isMe: boolean }>`
  width: ${(props) => (props.isMe ? '70%' : '100%')};
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 5rem;
  color: #f9fafb56;
  gap: 3rem;
  @media (max-width: 1020px) {
    width: 100%;
  }
`;

const Tabs = styled.div``;

const Type = styled.button<{ isOnClicked: boolean }>`
  color: ${(props) =>
    props.isOnClicked ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
  padding: 1rem 1.75rem;
  background-color: #000000;
  font-size: 1.4rem;
  cursor: pointer;
  font-weight: 700;
`;
