import api from './api';

const newPassApi = {
  changePass(password: string, repeatPassword: string, hash: string) {
    return api
      .post(`account/restore-password/${hash}`, {
        password,
        repeatPassword,
      })
      .then((res) => res);
  },
};

export default newPassApi;
