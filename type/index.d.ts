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

export type SearchResponse = {
  data: Waka[];
  hitCount: number;
};

export type SearchParams = {
  name?: string;
  score?: string;
  rank?: string;
};

export type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export type ShareButtonProps = {
  name: string;
  score: number;
  rank: number;
};
