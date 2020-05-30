import defaultAvatar from '../assets/default_avatar.png';

export default function processAvatar(originAvatar) {
  if (originAvatar && originAvatar.includes('/default_avatar.png')) {
    return defaultAvatar;
  }
  return originAvatar;
}
