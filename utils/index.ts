export function getShimonoku(tanka: string): string {
  // 短歌を改行または空白で区切る
  const lines = tanka.split(/\s+/);

  // 短歌の形式が5,7,5,7,7か確認
  if (lines.length !== 5) {
    throw new Error(
      '短歌の形式が正しくありません。5,7,5,7,7の形式にしてください。'
    );
  }

  // 下の句（最後の7,7）を結合して返す
  return `${lines[3]} ${lines[4]}`;
}
export function getShimonoku1(tanka: string): string {
  // 短歌を改行または空白で区切る
  const lines = tanka.split(/\s+/);

  // 短歌の形式が5,7,5,7,7か確認
  if (lines.length !== 5) {
    throw new Error(
      '短歌の形式が正しくありません。5,7,5,7,7の形式にしてください。'
    );
  }

  // 下の句（最後の7,7）を結合して返す
  return lines[3];
}
export function getShimonoku2(tanka: string): string {
  // 短歌を改行または空白で区切る
  const lines = tanka.split(/\s+/);

  // 短歌の形式が5,7,5,7,7か確認
  if (lines.length !== 5) {
    throw new Error(
      '短歌の形式が正しくありません。5,7,5,7,7の形式にしてください。'
    );
  }

  // 下の句（最後の7,7）を結合して返す
  return lines[4];
}
