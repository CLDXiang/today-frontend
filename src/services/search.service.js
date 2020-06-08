import axios from 'axios';
import log from '../utils/log';
import store from '../store';
import { API_URL } from '../utils/config';

export default function searchUser(str) {
  const headers = {
    Authorization: `Bearer ${store.state.user.jwt_token}`,
  };
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/user`, { headers, params: { search: str } })
      .then((resp) => {
        log.info('GET user search resp', resp);
        resolve(resp.data);
      })
      .catch((e) => reject(e));
  });
}
