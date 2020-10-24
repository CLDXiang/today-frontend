import log from '@/utils/log';
import dayjs from 'dayjs';
import { ReactionType } from './types';
import { mockReaction } from './mocks/reaction';

// FIXME: mock
/** 添加 Reaction */
const addReaction: (req: {
  /** Uni Id */
  uniId: string;
  /** emoji Id */
  emojiId: string;
}) => Promise<{
  msg: string;
  data: ReactionType;
}> = (req) =>
  new Promise((resolve) => {
    log.info('reactionClient.addReaction', req);
    const { emojiId } = req;

    const emojiArray = mockReaction.data.emoji[emojiId];
    if (!emojiArray) {
      mockReaction.data.emoji[emojiId] = [];
    }
    if (emojiArray && emojiArray.findIndex((v) => v.id === 'mock_test') === -1) {
      emojiArray.push({
        id: 'mock_test',
        nickname: 'mock_test',
        createdAt: dayjs().format('YYYYMMDDhhmmss'),
      });
    }
    resolve({
      msg: 'ok',
      data: mockReaction.data,
    });
  });

// FIXME: mock
/** 删除 Reaction */
const deleteReaction: (req: {
  /** Uni Id */
  uniId: string;
  /** emoji Id */
  emojiId: string;
}) => Promise<{
  msg: string;
  data: ReactionType;
}> = (req) =>
  new Promise((resolve) => {
    log.info('reactionClient.deleteReaction', req);
    const { emojiId } = req;

    const emojiArray = mockReaction.data.emoji[emojiId];
    if (emojiArray) {
      const index = emojiArray.findIndex((v) => v.id === 'mock_test');
      if (index !== -1) {
        emojiArray.splice(index, 1);
      }
    }
    if (emojiArray?.length === 0) {
      delete mockReaction.data.emoji[emojiId];
    }
    resolve({
      msg: 'ok',
      data: mockReaction.data,
    });
  });

const reactionClient = {
  addReaction,
  deleteReaction,
};

export default reactionClient;
