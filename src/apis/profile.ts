import axios from 'axios';
import { API_URL } from '@/utils/config';
import store from '../store';

const getUserProfile: (req: {
  userId?: string;
}) => Promise<{
  avatar: string;
  bio: string;
  nickName: string;
}> = ({
  userId = store.state.user.id as string,
}) =>
  new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .get(`${API_URL}/user/profile`, {
        params: { userId },
        headers: authHeader,
      })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => reject(err));
  });

const editProfile: (req: {
  nickName: string;
  bio: string;
}) => Promise<{
  avatar: string;
  bio: string;
  nickName: string;
}> = (req) =>
  new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .post(`${API_URL}/user/profile`, req, { headers: authHeader })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => reject(err));
  });

const uploadAvatar: (req: {
  userAvatar: FormData;
}) => Promise<{
  avatar: string;
  bio: string;
  nickName: string;
}> = ({ userAvatar }) =>
  new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .post(`${API_URL}/user/profile/avatar`, userAvatar, { headers: authHeader })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => reject(err));
  });

const profileClient = {
  /** 获取用户信息 */
  getUserProfile,
  /** 修改用户信息 */
  editProfile,
  /** 上传头像 */
  uploadAvatar,
};

export default profileClient;
