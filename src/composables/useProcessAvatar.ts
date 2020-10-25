import defaultAvatar from '@/assets/default_avatar.jpg';

/**
 * 处理后端返回的头像字段
 */
const useProcessAvatar: () => {
  processAvatar: (originAvatar: string) => string;
} = () => {
  const processAvatar = (originAvatar: string) => {
    if (!originAvatar || originAvatar.includes('/default_avatar.png')) {
      return defaultAvatar;
    }
    return originAvatar;
  };
  return {
    /** 处理头像 */
    processAvatar,
  };
};

export default useProcessAvatar;
