import { useEffect, useState } from 'react';
import styled from 'styled-components';
import roomSocket from '../../../adapters/roomSocket';
import { ReactComponent as TimerIcon } from '../../../assets/svg/Timer.svg';
import { ReactComponent as Divide } from '../../../assets/svg/Divide.svg';
import userStore from '../../../stores/userStore';

export default function Timer() {
  const { time: initTime } = userStore();
  const [time, setTime] = useState(initTime);
  const newSocket = roomSocket.socket;
  let tmpTime = initTime;
  let dts = 0;
  let dtm = 0;
  let tick = Date.now();

  let requestId;

  const callback = () => {
    dts += Date.now() - tick;
    dtm += Date.now() - tick;
    tick = Date.now();
    if (dtm >= 60000) {
      console.log('update DB');
      newSocket.emit('recordTime', { dtm });
      dtm = 0;
    }
    if (dts >= 1000) {
      tmpTime += Math.floor(dts / 1000);
      setTime(tmpTime);
      dts = 0;
      requestId = requestAnimationFrame(callback);
    } else {
      requestId = requestAnimationFrame(callback);
    }
  };

  useEffect(() => {
    requestAnimationFrame(callback);
    return () => cancelAnimationFrame(requestId);
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
      <TimerIcon />
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

const Hour = styled.span`
  margin-left: 1rem;
  margin-right: 0.3rem;
`;

const Minute = styled.span`
  margin: 0 0.3rem 0 0.3rem;
`;

const Second = styled.span`
  margin: 0 2.2rem 0 0.3rem;
`;
