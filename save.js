// 音声として保存する
function saveAsAudio() {
  // 音声データを作成する
  var audioContext = new AudioContext();
  var audioBuffer = audioContext.createBuffer(audioContext.sampleRate, audioContext.sampleRate / 44100 * 10, 2);
  for (var i = 0; i < audioBuffer.length; i++) {
    audioBuffer.getChannelData(0)[i] = midiData[i][1] / 127;
  }

  // 音声ファイルを作成する
  var audioFile = new AudioFileWriter();
  audioFile.setAudioBuffer(audioBuffer);
  audioFile.writeAsDataURL(document.getElementById("result").innerHTML);
}

// MIDIファイルとして保存する
function saveAsMIDI() {
  // MIDIファイルを作成する
  var midiFile = new MIDIFile();
  for (var i = 0; i < midiData.length; i++) {
    var note = midiData[i][0];
    var velocity = midiData[i][1];
    midiFile.addNote(0, 0, note, 0, 1, velocity);
  }

  // MIDIファイルを保存する
  var midiFileBlob = new Blob([midiFile.toByteArray()], { type: "application/octet-stream" });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(midiFileBlob);
  link.download = "midi.mid";
  link.click();
}

// 保存ボタンをクリックしたときに実行する
document.getElementById("save").addEventListener("click", function() {
  if (document.getElementById("format").value == "audio") {
    saveAsAudio();
  } else {
    saveAsMIDI();
  }
});
