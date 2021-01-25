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
  me(key: string) {
    return api
      .get('account', { headers: { Authorization: key } })
      .then((res) => res);
  },
  savePhoto(photoFile: string | ArrayBuffer | null | undefined, key: string) {
    return api
      .post(
        'account/set-avatar',
        { avatar: photoFile },
        {
          headers: {
            Authorization: key,
          },
        },
      )
      .then((res) => res);
  },
};

export default authApi;
