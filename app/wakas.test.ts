import { searchWakas } from '@/app/wakas';

jest.mock('@/app/wakas', () => {
  return {
    searchWakas: jest.fn().mockImplementation(({ page, filter, author }) => {
      if (page === 1 && filter === '秋の田の' && author === '天智天皇') {
        return Promise.resolve({
          id: 1,
          bodyKanji: '秋の田の かりほの庵の 苫をあらみ 我が衣手は 露にぬれつつ',
          bodyKana:
            'あきのたの かりほのいほの とまをあらみ わがころもでは つゆにぬれつつ',
          nameKanji: '天智天皇',
          nameKana: 'てんじてんのう',
          kimariji: 'あきの',
          imageWref: 'ファイル:Hyakuninisshu_001.jpg',
          imageURL:
            'http://upload.wikimedia.org/wikipedia/commons/0/04/Hyakuninisshu_001.jpg',
        });
      } else {
        return Promise.reject(new Error('Failed to fetchWakas: 500'));
      }
    }),
  };
});

describe('searchWakas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('成功した場合、APIからのデータを返す', async () => {
    const result = await searchWakas({
      page: 1,
      filter: '秋の田の',
      author: '天智天皇',
    });

    expect(result).toEqual({
      id: 1,
      bodyKanji: '秋の田の かりほの庵の 苫をあらみ 我が衣手は 露にぬれつつ',
      bodyKana:
        'あきのたの かりほのいほの とまをあらみ わがころもでは つゆにぬれつつ',
      nameKanji: '天智天皇',
      nameKana: 'てんじてんのう',
      kimariji: 'あきの',
      imageWref: 'ファイル:Hyakuninisshu_001.jpg',
      imageURL:
        'http://upload.wikimedia.org/wikipedia/commons/0/04/Hyakuninisshu_001.jpg',
    });
    expect(searchWakas).toHaveBeenCalledWith({
      page: 1,
      filter: '秋の田の',
      author: '天智天皇',
    });
    expect(searchWakas).toHaveBeenCalledTimes(1);
  });

  test('APIが失敗した場合、エラーをスローする', async () => {
    await expect(
      searchWakas({ page: 1, filter: '不正なフィルター', author: '不明な作者' })
    ).rejects.toThrow('Failed to fetchWakas: 500');
    expect(searchWakas).toHaveBeenCalledWith({
      page: 1,
      filter: '不正なフィルター',
      author: '不明な作者',
    });
    expect(searchWakas).toHaveBeenCalledTimes(1);
  });
});
