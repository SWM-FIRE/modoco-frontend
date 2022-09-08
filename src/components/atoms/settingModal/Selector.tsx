import React, { useState } from 'react';
import styled from 'styled-components';
import UserMediaStreamStore from '../../../stores/room/userMediaStreamStore';
import { ReactComponent as CameraSetting } from '../../../assets/svg/videoSetting.svg';
import { ReactComponent as MicSetting } from '../../../assets/svg/micSetting.svg';
import { ReactComponent as SpeakerSetting } from '../../../assets/svg/headphoneSetting.svg';
import { ReactComponent as BottomArrow } from '../../../assets/svg/bottomArrowSetting.svg';

export default function Selector({
  select,
  device,
}: {
  select: string;
  device: MediaDeviceInfo[] | null;
}) {
  let theme: string;
  let Icon: React.FC;
  let myDevice: MediaDeviceInfo | null;
  let setMyDevice: React.Dispatch<React.SetStateAction<MediaDeviceInfo>>;
  const [showDropDown, setDropDown] = useState<boolean>(false);
  const {
    userAudioInputDevice,
    userAudioOutputDevice,
    userVideoInputDevice,
    setUserAudioInputDevice,
    setUserAudioOutputDevice,
    setUserVideoInputDevice,
  } = UserMediaStreamStore();

  switch (select) {
    case 'camera':
      theme = '카메라';
      Icon = CameraSetting;
      myDevice = userVideoInputDevice;
      setMyDevice = setUserVideoInputDevice;
      break;
    case 'mic':
      theme = '마이크';
      Icon = MicSetting;
      myDevice = userAudioInputDevice;
      setMyDevice = setUserAudioInputDevice;
      break;
    case 'speaker':
      theme = '스피커';
      Icon = SpeakerSetting;
      myDevice = userAudioOutputDevice;
      setMyDevice = setUserAudioOutputDevice;
      break;
    default:
      theme = '카메라';
      Icon = CameraSetting;
      myDevice = userVideoInputDevice;
      setMyDevice = setUserVideoInputDevice;
      break;
  }

  const dropDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDropDown(!showDropDown);
  };

  const setDevice = (
    device: MediaDeviceInfo,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    setMyDevice(device);
    setDropDown(false);
  };

  const defaultDevice = (device: MediaDeviceInfo[]) => {
    if (device.length === 0) {
      return '선택해주세요';
    }
    const defaultDV = device.find((d) => d.deviceId === 'default');
    if (!defaultDV) {
      return '선택해주세요';
    }
    return defaultDV.label;
  };

  return (
    <Container>
      <SelectorTitle>
        <Icon />
        {theme}
      </SelectorTitle>
      <DropDownContainer onClick={dropDown}>
        <Text>
          {myDevice !== null ? myDevice?.label : defaultDevice(device)}
        </Text>
        <BottomArrow />
        {showDropDown && (
          <DropDownPosition>
            <DropDown>
              {device.map((device) => (
                <DropDownItem
                  key={device.deviceId}
                  onClick={(event) => {
                    setDevice(device, event);
                  }}
                >
                  <Text>{device.label}</Text>
                </DropDownItem>
              ))}
            </DropDown>
          </DropDownPosition>
        )}
      </DropDownContainer>
    </Container>
  );
}

const DropDownPosition = styled.div`
  position: absolute;
  top: 5rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  z-index: 1;
`;

const DropDown = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #31343e;
  @keyframes dropdown {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  animation: dropdown 0.4s ease;
`;

const DropDownItem = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const SelectorTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.9rem;
  line-height: 2.9rem;
  font-size: 1.4rem;
  color: #d1d5d8;
  font-family: IBMPlexSansKRRegular;
`;

const Text = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-weight: 500;
  font-size: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 2.9rem;
  color: #ffffff;
`;

const Container = styled.div``;

const DropDownContainer = styled.div`
  width: 100%;
  padding: 1.3rem 1.6rem;
  height: 4.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  position: relative;
  cursor: pointer;
`;
