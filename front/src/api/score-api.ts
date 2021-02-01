import api from './api';

const scoreApi = {
  getTotalScore(key: string, limit: number) {
    return api
      .get(`total-score/?limit=${limit}`, { headers: { Authorization: key } })
      .then((res) => res);
  },
  getLevelScore(key: string, lvl: number, limit: number, forUser = 0) {
    return api
      .get(`levels-stats/?level=${lvl}&limit=${limit}&forUser=${forUser}`, {
        headers: { Authorization: key },
      })
      .then((res) => res);
  },
  setGameTotalScore(key: string, totalScore: number) {
    return api
      .post('total-score', { totalScore }, { headers: { Authorization: key } })
      .then((res) => res);
  },
  setGameLevelScore(key: string, level: number, score: number) {
    return api
      .post(
        'levels-stats',
        { level, score },
        { headers: { Authorization: key } },
      )
      .then((res) => res);
  },
};

export default scoreApi;
