import api from './api';
import { GameConstructor } from '../components/canvas/interfaces';

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
  createSave(key: string, save: GameConstructor) {
    return api
      .post('saves', { saveData: save }, { headers: { Authorization: key } })
      .then((res) => res);
  },
};

export default savesApi;
