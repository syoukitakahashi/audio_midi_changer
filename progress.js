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

// 変換ボタンをクリックしたときに実行する
document.getElementById("submit").addEventListener("click", convert);
