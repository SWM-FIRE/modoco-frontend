import React, { useState } from 'react';
import styled from 'styled-components';
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
  const [showDropDown, setDropDown] = useState<boolean>(false);

  switch (select) {
    case 'camera':
      theme = '카메라';
      Icon = CameraSetting;
      break;
    case 'mic':
      theme = '마이크';
      Icon = MicSetting;
      break;
    case 'speaker':
      theme = '스피커';
      Icon = SpeakerSetting;
      break;
    default:
      theme = '카메라';
      Icon = CameraSetting;
      break;
  }

  const dropDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDropDown(!showDropDown);
  };

  return (
    <Container>
      <SelectorTitle>
        <Icon />
        {theme}
      </SelectorTitle>
      <CameraDropDown onClick={dropDown}>
        <Text>{device[0]?.label}</Text>
        <BottomArrow />
        {showDropDown && (
          <DropDownPosition>
            <DropDown>
              {device.map((device) => (
                <DropDownItem key={device.deviceId}>
                  <Text>{device.label}</Text>
                </DropDownItem>
              ))}
            </DropDown>
          </DropDownPosition>
        )}
      </CameraDropDown>
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

const CameraDropDown = styled.div`
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
