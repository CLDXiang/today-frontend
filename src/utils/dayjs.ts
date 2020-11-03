import dayjs, { Dayjs } from 'dayjs';

/** 扩展 dayjs()，若参数为 undefined 则返回 undefined */
export const dayjsOrUndefined = (time?: string) => (time ? dayjs(time) : undefined);

/** 扩展 Dayjs.format，若 Dayjs 对象为 undefined 则返回 undefined */
export const dayjsFormatOrUndefined = (time?: Dayjs) => (time ? time.format() : undefined);
