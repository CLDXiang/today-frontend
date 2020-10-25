import { CardLectureItem } from '@/components/listCard';
import log from '@/utils/log';
import { mockSelects, mockLectureDetail } from './mocks/lecture';
import { LectureItem } from './types';

// FIXME: mock
const getSelectList: (req: {
  /** 用户名 */
  username: string;
  /** 当前学期，没有时返回所有学期 */
  semester?: string;
  /** 分页 - 最后一个 lecture 的 id */
  lastId?: string;
  /** 拉取条数 */
  limit: number;
}) => Promise<{
  msg: string;
  data: CardLectureItem[];
}> = (
  req,
) => {
  log.info('lectureClient.getSelectList', req);
  return new Promise((resolve) => {
    resolve({
      msg: 'ok',
      data: mockSelects,
    });
  });
};

// FIXME: mock
const getLectureList: (req: {
  /** 课程类型 */
  type: string;
  /** 分页 - 最后一个 lecture 的 id */
  lastId?: string;
  /** 拉取条数 */
  limit: number;
}) => Promise<{
  msg: string;
  data: CardLectureItem[];
}> = (
  req,
) => {
  log.info('lectureClient.getLectureList', req);
  return new Promise((resolve) => {
    resolve({
      msg: 'ok',
      data: mockSelects,
    });
  });
};

// FIXME: mock
const getLectureDetail: (req: {
  /** Lecture Id */
  lectureId: string;
}) => Promise<{
  data: LectureItem;
}> = (
  req,
) => {
  log.info('lectureClient.getLectureDetail', req);
  return new Promise((resolve) => {
    resolve({
      data: mockLectureDetail,
    });
  });
};

const lectureClient = {
  getLectureList,
  getSelectList,
  getLectureDetail,
};

export default lectureClient;
