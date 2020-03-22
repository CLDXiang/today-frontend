import axios from 'axios';
import { API_URL } from '../utils/config';

export default function register(name, email, password) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/register`, {
        name,
        password,
        email,
      })
      .then((response) => resolve(response, response.data))
      .catch((err) => reject(err));
  });
}
