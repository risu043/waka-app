export type Waka = {
  id: number;
  bodyKanji: string;
  bodyKana: string;
  nameKanji: string;
  nameKana: string;
  kimariji: string;
  imageWref: string;
  imageURL: string;
};

export type User = {
  id: number;
  name: string;
  score: number;
  rank: number;
};

export type UserResponse = {
  usersWithRank: User[];
  hitCount: number;
};

type SearchResponse = {
  data: Waka[];
  hitCount: number;
};
