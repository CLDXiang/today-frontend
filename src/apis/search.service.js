import axios from 'axios';
// import log from '@/utils/log';
import { API_URL } from '@/utils/config';
import store from '../store';

export default function searchUser(str) {
  const headers = {
    Authorization: `Bearer ${store.state.user.jwt_token}`,
  };
  return new Promise((resolve, reject) => {
    if (str === null || str === undefined || str === '') resolve([]);
    else {
      axios
        .get(`${API_URL}/user`, { headers, params: { search: str } })
        .then((resp) => {
          // log.info('GET user search resp', resp);
          resolve(resp.data);
        })
        .catch((e) => reject(e));
    }
  });
}
