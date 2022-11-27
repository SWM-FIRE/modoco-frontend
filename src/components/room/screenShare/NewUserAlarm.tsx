import { useEffect } from 'react';

export default function NewUserAlarm({ volumeRef }) {
  const newUserAlarm = 'https://s3.modocode.com/newUserAlarm.mp3';
  useEffect(() => {
    volumeRef.current.play();
  }, []);
  return (
    <audio ref={volumeRef} src={newUserAlarm} autoPlay>
      <track kind="captions" />
    </audio>
  );
}
