// 各種オーディオファイルを読み込む
function loadAudioFile(url) {
  return fetch(url, {
    method: "POST",
  }).then(function(response) {
    return response.blob();
  });
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

// 進捗状況を表示する
function showProgress(progress) {
  document.getElementById("progress").innerHTML = progress + "%";
}

// 変換処理
function convert() {
  // 進捗状況を0に設定
  document.getElementById("progress").innerHTML = "0%";

  // オーディオファイルを読み込む
  var audioBuffer = loadAudioFile(document.getElementById("audio-file").files[0]);

  // 音声データをMIDIデータに変換する
  var midiData = convertAudioToMIDI(audioBuffer);

  // 進捗状況を100%に設定
  document.getElementById("progress").innerHTML = "100%";

  // 結果を表示する
  document.getElementById("result").innerHTML = midiData;
}

// 保存処理
function save() {
  // 保存形式を選択する
  var format = document.getElementById("format").value;

  // 保存する
  if (format == "audio") {
    saveAsAudio();
  } else {
    saveAsMIDI();
  }
}

// 変換ボタンをクリックしたときに実行する
document.getElementById("submit").addEventListener("click", convert);

// 保存ボタンをクリックしたときに実行する
document.getElementById("save").addEventListener("click", save);

