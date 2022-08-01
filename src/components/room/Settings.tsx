import styled from 'styled-components';
import { ReactComponent as MicOff } from '../../assets/svg/MicOff.svg';
import { ReactComponent as MicOn } from '../../assets/svg/MicOn.svg';
import { ReactComponent as MonitorOn } from '../../assets/svg/MonitorOn.svg';
import { ReactComponent as MonitorOff } from '../../assets/svg/MonitorOff.svg';
import { ReactComponent as VideoOn } from '../../assets/svg/VideoOn.svg';
import { ReactComponent as VideoOff } from '../../assets/svg/VideoOff.svg';
import UserMediaStreamStore from '../../stores/userMediaStreamStore';
import { useCreateMediaStream } from '../../hooks/useCreateMediaStream';

export default function Settings() {
  const { userMic, setUserMic, userVideo, userMediaStream, setUserVideo } =
    UserMediaStreamStore();
  const { createMediaStream, stopMediaStream } = useCreateMediaStream();
  const setMediaStream = () => {
    if (userMediaStream) {
      stopMediaStream();
    } else {
      createMediaStream();
    }
  };
  const setMic = () => {
    setUserMic();
  };
  const setVideo = () => {
    setUserVideo();
  };
  return (
    <Component>
      <Button onClick={setMediaStream}>
        {userMediaStream ? <MonitorOn /> : <MonitorOff />}
      </Button>
      <Button onClick={setMic}>{userMic ? <MicOn /> : <MicOff />}</Button>
      <Button onClick={setVideo}>
        {userVideo ? <VideoOn /> : <VideoOff />}
      </Button>
    </Component>
  );
}

const Component = styled.div`
  margin-left: 2.4rem;
  display: flex;
  gap: 2.4rem;
`;

const Button = styled.button`
  cursor: pointer;
`;
