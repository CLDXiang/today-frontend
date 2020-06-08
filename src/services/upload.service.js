import { postImage } from './post.service';
import message from '../utils/message';

export default function uploadImage(file, cb /* , source */) {
  const pattern = /^image\//;
  if (file.type.match(pattern)) {
    postImage(file)
      .then((resp) => {
        cb(resp.url);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    message.error('只能选择图片文件！');
  }
}
