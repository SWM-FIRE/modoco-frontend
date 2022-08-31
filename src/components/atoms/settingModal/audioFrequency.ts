const audioFrequency = (stream: MediaStream) => {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const microphone = audioContext.createMediaStreamSource(stream);
  microphone.connect(analyser);
  // analyser.smoothingTimeConstant = 0.8;
  analyser.fftSize = 256; // 2048
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const getAudio = () => {
    analyser.getByteFrequencyData(dataArray);

    let total = 0;
    for (let i = 0; i < bufferLength; i += 1) {
      total += dataArray[i];
    }
    return total / bufferLength;
  };

  return { getAudio };
  //   setInterval(() => {
  //     getAudio();
  //   }, 100);
};

export default audioFrequency;
