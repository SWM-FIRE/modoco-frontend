import { useEffect } from 'react';

export default function ChattingAlarm({ volumeRef, isAlarmToggle }) {
  const chattingAlarm = 'https://s3.modocode.com/chattingAlarm.mp3';
  useEffect(() => {
    // console.log(isAlarmToggle);
    volumeRef.current.play();
  }, [isAlarmToggle]);
  return (
    <audio ref={volumeRef} src={chattingAlarm} autoPlay>
      <track kind="captions" />
    </audio>
  );
}
