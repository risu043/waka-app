'use client';

export default function AboutPage() {
  const utterance = new SpeechSynthesisUtterance();

  const speakTest = () => {
    utterance.text = 'テスト音声を出力します';
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 2;
    speechSynthesis.speak(utterance);
  };
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page</p>
      <button onClick={() => speakTest()}>test</button>
    </div>
  );
}
