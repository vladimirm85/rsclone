import axios from 'axios';

const api = axios.create({
  baseURL: 'https://arkanoid-rsclone-be.herokuapp.com',
});

export default api;
