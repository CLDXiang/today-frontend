import axios from 'axios';
import { API_URL } from '@/utils/config';
import { GetUsersIdRespDto, PatchUsersIdReqDto, PatchUsersIdRespDto } from './dto';

/** 获取用户信息 */
const getUserInfo: (req: {
  /** 用户 Id */
  userId?: string;
}) => Promise<{
  id: string;
  email: string;
  name: string;
  nickname: string;
  avatar: string;
  bio: string;
  fans: number;
  watchers: number;
  watchees: number;
}> = ({ userId }) =>
  new Promise((resolve, reject) => {
    axios
      .get<GetUsersIdRespDto>(`${API_URL}/users/${userId || ''}`)
      .then(({ data: { data } }) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });

/** 修改用户信息 */
const editUserInfo: (req: {
  /** 用户 Id */
  uid?: string;
  /** 邮箱 */
  email?: string;
  /** 昵称 */
  nickname?: string;
  /** 旧密码 */
  oldPassword?: string;
  /** 新密码 */
  password?: string;
  /** 头像 */
  avatar?: string;
  /** 个性签名 */
  bio?: string;
  /** 验证码 */
  code?: string;
}) => Promise<{
  id: string;
  email: string;
  name: string;
  nickname?: string;
  avatar: string;
  bio?: string;
}> = (req) =>
  new Promise((resolve, reject) => {
    axios
      .patch<PatchUsersIdRespDto>(`${API_URL}/users/${req.uid || ''}`, req as PatchUsersIdReqDto)
      .then(({ data: { data } }) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });

/** 修改用户头像 */
const uploadAvatar: (req: {
    userAvatar: FormData;
  }) => Promise<{
    avatar: string;
    bio: string;
    nickname: string;
  }> = ({ userAvatar }) =>
    new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/user/profile/avatar`, userAvatar)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => reject(err));
    });

const userClient = {
  /** 获取用户信息 */
  getUserInfo,
  /** 修改用户信息 */
  editUserInfo,
  /** 修改用户头像 */
  uploadAvatar,
};

export default userClient;
