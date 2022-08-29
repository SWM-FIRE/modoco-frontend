import { Dispatch, SetStateAction } from 'react';

const getDevice = async (
  setAudioInput: Dispatch<SetStateAction<MediaDeviceInfo[]>>,
  setAudioOutput: Dispatch<SetStateAction<MediaDeviceInfo[]>>,
  setVideoInput: Dispatch<SetStateAction<MediaDeviceInfo[]>>,
) => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    setAudioInput(devices.filter((device) => device.kind === 'audioinput'));
    setAudioOutput(devices.filter((device) => device.kind === 'audiooutput'));
    setVideoInput(devices.filter((device) => device.kind === 'videoinput'));
    return devices;
  } catch (error) {
    return 'error';
  }
};

export default getDevice;
