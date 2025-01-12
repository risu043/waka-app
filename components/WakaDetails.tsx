'use client';

import { Waka } from '@/type';

import {
  getKaminoku1,
  getKaminoku2,
  getKaminoku3,
  getShimonoku1,
  getShimonoku2,
} from '@/utils';

export const WakaDetails = ({ waka }: { waka: Waka }) => {
  const kaminoku1 = getKaminoku1(waka.bodyKanji);
  const kaminoku2 = getKaminoku2(waka.bodyKanji);
  const kaminoku3 = getKaminoku3(waka.bodyKanji);
  const shimonoku1 = getShimonoku1(waka.bodyKanji);
  const shimonoku2 = getShimonoku2(waka.bodyKanji);

  return (
    <div className="writing-vertical mx-auto h-60 text-2xl">
      <p>{kaminoku1}</p>
      <p>{kaminoku2}</p>
      <p>{kaminoku3}</p>
      <p>{shimonoku1}</p>
      <p>{shimonoku2}</p>
      <p className="mr-4">作者</p>
      <p>{waka.nameKanji}</p>
    </div>
  );
};
