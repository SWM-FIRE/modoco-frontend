import { useEffect } from 'react';

export default function NewUserAlarm({ volumeRef }) {
  const newUserAlarm = 'https://static.modocode.com/newUserAlarm.mp3';
  useEffect(() => {
    volumeRef.current.play();
  }, []);
  return (
    <audio ref={volumeRef} src={newUserAlarm} autoPlay>
      <track kind="captions" />
    </audio>
  );
}
