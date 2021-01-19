import axios from 'axios';

const api = axios.create({
  baseURL: 'https://arkanoid-rss-be.herokuapp.com/',
});

export default api;
