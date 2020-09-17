import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function renderTime(time) {
  const formatted = dayjs(time).locale('zh-cn').fromNow();
  return formatted;
}
