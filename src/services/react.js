import axios from 'axios';
import emojiData from 'emoji-mart-vue-fast/data/twitter.json';
import log from '../utils/log';
import store from '../store';

import { API_URL } from '../utils/config';

export const emojiStrToInt = new Map();
export const emojiIntToStr = new Map();

function bimap1(emojiStr, idx) {
  emojiStrToInt.set(emojiStr, idx);
  emojiIntToStr.set(idx, emojiStr);
}

bimap1('upvote', 1);
bimap1('downvote', 0);
let i = 2;
Object.keys(emojiData.emojis).forEach((emojiStr) => {
  bimap1(emojiStr, i);
  i += 1;
});

export function postReaction(target, emojiStr) {
  const headers = {
    Authorization: `Bearer ${store.state.user.jwt_token}`,
  };
  const [reactToType, reactToId] = target.split(' ');

  // Favor
  if (emojiStr === 'favor') {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/course/${reactToId}/star`, {}, { headers })
        .then((resp) => {
          log.info('POST star resp', resp);
        })
        .catch((e) => reject(e));
    });
  }

  // Reactions
  if (reactToType === 'rates') {
    return new Promise((resolve, reject) => {
      const data = {
        type: reactToType,
        emoji: emojiStrToInt.get(emojiStr),
      };
      axios
        .post(`${API_URL}/rate/${reactToId}/react`, data, { headers })
        .then((resp) => {
          log.info('POST reaction resp', resp);
          resolve(resp.data);
        })
        .catch((e) => reject(e));
    });
  }
  return new Promise();
}

export function deleteReaction(target, emojiStr) {
  const headers = {
    Authorization: `Bearer ${store.state.user.jwt_token}`,
  };

  const [reactToType, reactToId] = target.split(' ');

  if (emojiStr === 'favor') {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${API_URL}/course/${reactToId}/star`, { headers })
        .then((resp) => {
          log.info('DELETE star resp', resp);
        })
        .catch((e) => reject(e));
    });
  }

  if (reactToType === 'rates') {
    return new Promise((resolve, reject) => {
      axios
        // emojiStr is in fact a reaction id(int)
        .delete(`${API_URL}/rate/react/${emojiStr}`, { headers })
        .then((resp) => {
          log.info('DELETE reaction resp', resp);
          resolve(resp);
        })
        .catch((e) => reject(e));
    });
  }
  return new Promise();
}
