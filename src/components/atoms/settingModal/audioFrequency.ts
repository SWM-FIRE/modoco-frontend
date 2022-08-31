const audioFrequency = (dataArray, bufferLength) => {
  let total = 0;
  for (let i = 0; i < bufferLength; i += 1) {
    total += dataArray[i];
  }
  return total / bufferLength;
};

export default audioFrequency;
