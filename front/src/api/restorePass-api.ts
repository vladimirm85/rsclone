import api from './api';

const restorePassApi = {
  restore(email: string) {
    return api.post('account/forgot-password', { email }).then((res) => res);
  },
};

export default restorePassApi;
