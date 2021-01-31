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
};

export default scoreApi;
