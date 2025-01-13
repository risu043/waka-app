'use client';

export default function AboutPage() {
  let utterance: SpeechSynthesisUtterance | null = null;

  // ブラウザ環境でのみインスタンスを初期化
  if (typeof window !== 'undefined') {
    utterance = new SpeechSynthesisUtterance();
  }

  const speakTest = () => {
    if (utterance) {
      utterance.text = 'テスト音声を出力します';
      utterance.lang = 'ja-JP';
      utterance.pitch = 1;
      utterance.rate = 0.4;
      utterance.volume = 1;
      speechSynthesis.speak(utterance);
    } else {
      console.error(
        'SpeechSynthesisUtterance is not supported in this environment.'
      );
    }
  };

  return (
    <div>
      <h1>About</h1>
      <p>This is the about page</p>
      <button onClick={speakTest}>test</button>
    </div>
  );
}
