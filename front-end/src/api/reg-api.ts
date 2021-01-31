import api from './api';

const regApi = {
  register(email: string, password: string, repeatPassword: string) {
    return api
      .post('auth/register', {
        email,
        password,
        repeatPassword,
      })
      .then((res) => res);
  },
};

export default regApi;
