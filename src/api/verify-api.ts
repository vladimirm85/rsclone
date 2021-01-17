import api from './api';

const verifyApi = {
  verifyEmail(key: string) {
    return api.get(`account/verify/${key}`).then((res) => res);
  },
};

export default verifyApi;
