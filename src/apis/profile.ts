import axios from 'axios';
import { API_URL } from '@/utils/config';
import store from '../store';

interface GetUserProfileReq {
  userId?: string;
}

interface GetUserProfileResp {
  avatar: string;
  bio: string;
  nickName: string;
}

const getUserProfile: (req: GetUserProfileReq) => Promise<GetUserProfileResp> = ({
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

interface EditProfileReq {
  nickName: string;
  bio: string;
}

interface EditUserProfileResp {
  avatar: string;
  bio: string;
  nickName: string;
}

const editProfile: (req: EditProfileReq) => Promise<EditUserProfileResp> = (req) =>
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

interface UploadAvatarReq {
  userAvatar: FormData;
}

interface UploadAvatarResp {
  avatar: string;
  bio: string;
  nickName: string;
}

const uploadAvatar: (req: UploadAvatarReq) => Promise<UploadAvatarResp> = ({ userAvatar }) =>
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
