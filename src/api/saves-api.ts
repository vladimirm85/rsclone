import api from './api';

const savesApi = {
  getAllSaves(key: string) {
    return api
      .get('saves', { headers: { Authorization: key } })
      .then((res) => res);
  },
  deleteSave(key: string, id: string) {
    return api
      .delete(`saves/${id}`, { headers: { Authorization: key } })
      .then((res) => res);
  },
};

export default savesApi;
