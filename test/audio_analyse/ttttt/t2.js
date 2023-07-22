const s = async function (t) {
  return fetch(t).then((response) => response.arrayBuffer());
};

async function decode(t, sampleRate) {
  const audioContext = new AudioContext({ sampleRate: sampleRate });
  const decodedData = await s(t);
  const buffer = await audioContext.decodeAudioData(decodedData);
  audioContext.close();
  return buffer;
}

async function load(t, sampleRate) {
  try {
    const decodedData = await decode(t, sampleRate);
    const audioData = [decodedData.getChannelData(0)];
    return audioData;
  } catch (error) {
    console.error("加载音频时出错:", error);
    throw error;
  }
}

const audioData = load("./1.mp3", 8000);
console.log(audioData);
