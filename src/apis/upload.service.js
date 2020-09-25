// import message from '@/utils/message';
import log from '@/utils/log';
import { postImage } from './post.service';

export default function uploadImage(file, cb /* , source */) {
  const pattern = /^image\//;
  if (file.type.match(pattern)) {
    postImage(file)
      .then((resp) => {
        cb(resp.url);
      })
      .catch((err) => {
        log.error(err);
      });
  } else {
    // FIXME: 错误提示
    // message.error('只能选择图片文件！');
  }
}
