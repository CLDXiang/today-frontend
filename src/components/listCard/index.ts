import './listCard.scss';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';

export { default as CardLecture } from './CardLecture.vue';
export { default as CardRating } from './CardRating.vue';
export { default as CardUser } from './CardUser.vue';
export { default as CardReactiveRating } from './CardReactiveRating.vue';
export { default as CardComment } from './CardComment.vue';

export * from './types';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
