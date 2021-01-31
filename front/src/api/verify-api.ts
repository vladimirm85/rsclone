import api from './api';

const verifyApi = {
  verifyEmail(key: string) {
    return api.post(`account/verify/${key}`).then((res) => res);
  },
};

export default verifyApi;
