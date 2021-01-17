import api from './api';

const authApi = {
  login(email: string, password: string) {
    return api
      .post('auth/login', {
        email,
        password,
      })
      .then((res) => res);
  },
};

export default authApi;
