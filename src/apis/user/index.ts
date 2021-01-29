import API from '@/utils/axios';
import log from '@/utils/log';
import { GetUsersIdRespDto, PatchUsersIdReqDto, PatchUsersIdRespDto } from './dto';

/** 修改密码 */
const modifyPassword = async (req: {
  email: string;
  newPassword: string;
  /** 验证码 */
  code: string;
}): Promise<null> => {
  log.info('userClient.getUserInfo', req);
  await API.post<null>('users/forget');
  return null;
};

/** 获取用户信息 */
const getUserInfo = async (req: {
  /** 用户 Id */
  userId?: string;
}): Promise<{
  id: string;
  email: string;
  name: string;
  nickname: string;
  avatar: string;
  bio: string;
  fans: number;
  watchers: number;
  watchees: number;
}> => {
  log.info('userClient.getUserInfo', req);
  const { data: { data } } = await API.get<GetUsersIdRespDto>(`users/${req.userId || ''}`);
  return data;
};

/** 修改用户信息 */
const editUserInfo = async (req: {
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
}): Promise<{
  id: string;
  email: string;
  name: string;
  nickname?: string;
  avatar: string;
  bio?: string;
}> => {
  log.info('userClient.editUserInfo', req);
  const { data: { data } } = await API.patch<PatchUsersIdRespDto>(`users/${req.uid || ''}`, req as PatchUsersIdReqDto);
  return data;
};

/** 修改用户头像 */
const uploadAvatar = async (req: {
  userAvatar: FormData;
}): Promise<{
  avatar: string;
  bio: string;
  nickname: string;
}> => {
  log.info('userClient.uploadAvatar', req);
  const { data } = await API.post('user/profile/avatar', req.userAvatar);
  return data;
};

const userClient = {
  /** 修改密码 */
  modifyPassword,
  /** 获取用户信息 */
  getUserInfo,
  /** 修改用户信息 */
  editUserInfo,
  /** 修改用户头像 */
  uploadAvatar,
};

export default userClient;
