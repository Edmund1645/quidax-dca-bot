import axios from 'axios';
import config from '../../config';
const QuidaxAPI = axios.create({
  baseURL: 'https://www.quidax.com/api/v1',
  headers: {
    Authorization: `Bearer ${config.quidax_secret}`,
  },
});

export { QuidaxAPI };
