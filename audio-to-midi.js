// 各種オーディオファイルを読み込む
function loadAudioFile(url) {
  var audioContext = new AudioContext();
  var audioBuffer = audioContext.createBuffer(audioContext.sampleRate, audioContext.sampleRate / 44100 * 10, 2);
  var audioFile = new AudioFileReader();
  audioFile.addEventListener("load", function() {
    audioBuffer.copyFromChannel(audioFile.getChannelData(0), 0, 0, audioBuffer.length);
  });
  audioFile.readAsArrayBuffer(new Request(url));
  return audioBuffer;
}

// 音声データをMIDIデータに変換する
function convertAudioToMIDI(audioBuffer) {
  var midiData = [];
  var frequency = audioBuffer.sampleRate / audioBuffer.length;
  for (var i = 0; i < audioBuffer.length; i++) {
    var amplitude = audioBuffer.getChannelData(0)[i];
    var note = Math.round(69 + 12 * Math.log2(frequency / 440) / Math.log2(2));
    var velocity = Math.round(amplitude * 127);
    midiData.push([note, velocity]);
  }
  return midiData;
}

// プログラムの実行
/*var audioBuffer = loadAudioFile("audio.wav");
var midiData = convertAudioToMIDI(audioBuffer);
console.log(midiData);*/
