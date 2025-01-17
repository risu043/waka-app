'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RippleButton from '@/components/ui/ripple-button';
import { VolumeIcon as VolumeUp, ArrowLeft } from 'lucide-react';
import { Shippori_Mincho } from 'next/font/google';

const shipporiMincho = Shippori_Mincho({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export default function AboutPage() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/');
  };

  let utterance: SpeechSynthesisUtterance | null = null;

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div
      className={`${shipporiMincho.className} container mx-auto p-4 max-w-4xl text-xl`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                遊び方
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Image
                src="/image/about01.png"
                width={1000}
                height={500}
                alt="遊び方"
                priority
                className="rounded-lg shadow-md"
              />
              <p className="text-2xl">
                ブラウザ上で百人一首が遊べるアプリです！
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  100首からランダムに10首が選ばれ、その下の句がゲーム画面に表示されます。
                </li>
                <li>
                  Startボタンを押すと、パソコンが1首ずつ読み札を読みあげます。
                </li>
                <li>これだ！と思う札をクリックしてください。</li>
                <li>判定が終わると、パソコンが次の読み札を読み上げます。</li>
                <li>読み上げにはWeb Speech APIを使用しています。</li>
              </ul>
              <RippleButton
                rippleColor="#FFFFFF"
                onClick={speakTest}
                className="button accent-button mb-8 mx-auto"
              >
                <span className="flex items-center">
                  <VolumeUp className="mr-2 h-4 w-4" />
                  <span>テスト音声を出力します</span>
                </span>
              </RippleButton>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                ランキング
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Image
                src="/image/about02.png"
                width={1000}
                height={500}
                alt="ランキング"
                priority
                className="rounded-lg shadow-md"
              />
              <ul className="list-disc pl-5 space-y-2">
                <li>10首目の判定が終わるとクリア画面に移動します。</li>
                <li>
                  ニックネームを入力して送信すると、ランキング画面に掲載されます。
                </li>
                <li>
                  速くクリアする程スコアが加算されます。是非遊んでみてください！
                </li>
              </ul>
              <RippleButton
                rippleColor="#FFFFFF"
                onClick={handleNavigation}
                className="button accent-button mb-8 mx-auto"
              >
                <span className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span>トップページに戻る</span>
                </span>
              </RippleButton>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
