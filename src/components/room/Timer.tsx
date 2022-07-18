import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Divide } from '../../assets/svg/Divide.svg';

export default function Timer() {
  const [time, setTime] = useState(0);
  function timer() {
    let start = new Date().getTime();
    const callback = () => {
      const ts = new Date().getTime();
      if (ts - 1000 > start) {
        setTime((time) => time + 1);
        start = new Date().getTime();
        requestAnimationFrame(callback);
      } else {
        requestAnimationFrame(callback);
      }
    };
    requestAnimationFrame(callback);
  }
  useEffect(() => {
    timer();
  }, []);

  const TimerHour =
    Math.floor(time / 3600) < 10
      ? `0${Math.floor(time / 3600)}`
      : Math.floor(time / 3600);

  const TimerMinute =
    Math.floor((time % 3600) / 60) < 10
      ? `0${Math.floor((time % 3600) / 60)}`
      : Math.floor((time % 3600) / 60);

  const TimerSecond =
    Math.floor(time % 60) < 10
      ? `0${Math.floor(time % 60)}`
      : Math.floor(time % 60);

  return (
    <Component>
      <Status />
      <Hour>{TimerHour}</Hour> :<Minute>{TimerMinute}</Minute> :
      <Second>{TimerSecond}</Second>
      <Divide />
    </Component>
  );
}

const Component = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Status = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  background-color: #ef4444;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.8rem;
`;

const Hour = styled.span`
  margin-right: 0.3rem;
`;

const Minute = styled.span`
  margin: 0 0.3rem 0 0.3rem;
`;

const Second = styled.span`
  margin: 0 2.2rem 0 0.3rem;
`;
