export type ScoreType = {
  createdAt: string;
  _id: string;
  totalScore?: number;
  userId?: string;
  nickname: string;
  __v: number;
  score?: number;
  level?: number;
};

export type SavesType = {
  createdAt: string;
  _id: string;
  saveData: never;
  userId: string;
  __v: number;
};
