/** POST users/forget Req */
export interface PostUsersForgetReqDto {
  email: string;
  newPassword: string;
  /** 验证码 */
  code: string;
}

/** GET users/:id Resp */
export interface GetUsersIdRespDto {
  data: {
    id: string;
    email: string;
    name: string;
    nickname: string;
    avatar: string;
    bio: string;
    fans: number;
    watchers: number;
    watchees: number;
  }
}

/** PATCH users/:id Req */
export interface PatchUsersIdReqDto {
  email?: string;
  nickname?: string;
  oldPassword?: string;
  password?: string;
  avatar?: string;
  bio?: string;
  /** 验证码 */
  code?: string;
}

/** PATCH users/:id Resp */
export interface PatchUsersIdRespDto {
  data: {
    id: string;
    email: string;
    name: string;
    nickname?: string;
    avatar: string;
    bio?: string;
  }
}
