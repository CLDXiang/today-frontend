import store from '@/store';

/** 获取当前登录用户的 Id */
export const getCurrentUserId = () => store.state.user.id || undefined;
