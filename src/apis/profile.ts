import axios from 'axios';
import { API_URL } from '@/utils/config';
import store from '../store';
import { mockProfiles } from './mocks/profile';

const getUserProfile: (req: {
  userId?: string;
}) => Promise<{
  avatar: string;
  bio: string;
  name: string;
  nickName: string;
  // FIXME: match names according to backend API
  following: number;
  follower: number;
  star: number;
}> = ({ userId = store.state.user.id as string }) =>
  // FIXME: fix reject and catch
  // new Promise((resolve, reject) => {
  new Promise((resolve) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .get(`${API_URL}/user/profile`, {
        params: { userId },
        headers: authHeader,
      })
      .then((resp) => {
        const profile = resp.data;
        if (!profile.nickName) {
          profile.nickName = profile.name;
        }
        resolve(profile);
      })
      // FIXME: mock
      // .catch((err) => reject(err));
      .catch(() => {
        const mockProfile = mockProfiles[0];
        resolve(mockProfile as {
          avatar: string;
          bio: string;
          name: string;
          nickName: string;
          following: number;
          follower: number;
          star: number;
        });
      });
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
