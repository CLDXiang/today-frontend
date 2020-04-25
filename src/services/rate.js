import axios from 'axios';
import log from '../utils/log';

import store from '../store';

import { API_URL } from '../utils/config';

/**
 ******************************
 * @API
 ******************************
 */

/*
 *  Description:
 *    Get rates in batch, i.e., tuples in range [start_idx, start_idx + length)
 *    after sorting are expected.
 *
 *  DTO:
 *  {
 *    start_idx: int,   // [0, rates.length)
 *    length: int,      // such that [start_idx, start_idx + length) should be return
 *    order: String,    // "default", "time", ...
 *  }
 *
 *  Response:
 *  {
 *    [
 *      id: 123,
 *      author: "foo",
 *      avatar: String, // url which will be used by <img src="avatar">
 *      time: int,
 *      content: String,
 *      replyCnt: int, // Number of replies of this rate
 *
 *      reactions: [
 *        {
 *          user_id: int,
 *          type: int,
 *          timestamp: int,
 *        },...
 *      ],
 *
 *    ], ...
 *  }
 *
 */
export function getRateBatch(id, startIdx, length, order) {
  return new Promise((resolve, reject) => {
    const data = {
      start_idx: startIdx,
      length,
      order,
    };
    axios
      .get(`${API_URL}/rate/lecture/${id}`, data)
      .then((resp) => {
        log.info('GET rate resp', resp);
        resolve(resp);
      })
      .catch((err) => reject(err));
  });
}

export function getLectureRateInfo(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/rate/lecture/${id}`)
      .then((resp) => {
        log.info('GET lecture rate info resp', resp);
        return resolve(resp);
      })
      .catch((error) => reject(error));
  });
}

/*
 *  Response:
 *  {
 *    id: 123,
 *  }
 *
 */
export function postRate(lectureId, workload, difficulty, grading, content, semester, score) {
  return new Promise((resolve, reject) => {
    const header = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };

    // FIXME need semester, score ?
    log.info('rate post not include', semester, score);

    const data = {
      // semester,
      // score,
      lecture_id: lectureId,
      workload,
      difficulty,
      grading,
      content,
    };
    log.info('rate post payload: ', data, { headers: header });
    axios
      .post(`${API_URL}/rate`, data, { headers: header })
      .then((resp) => {
        log.info('POST rate resp', resp);
        return resolve(resp);
      })
      .catch((error) => reject(error));
  });
}

/*
 *  Description:
 *    Get all replies under rate_id
 *
 *  Response:
 *  {
 *    reply_id: int,
 *    user_id: int,
 *    name: String,
 *    avatar: String,
 *    content: String,
 *    timestamp: int,
 *    reactions: [
 *      {
 *        user_id: int,
 *        type: ":thumbup:",
 *        timestamp: int,
 *      },...
 *    ]
 *  }
 *
 *
 */
export function getReplies(rateId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/rate/${rateId}/reply`)
      .then((resp) => {
        log.info('GET reply resp', resp);
        resolve(
          resp.map((r) => ({
            user_id: r.user_id,
            name: r.name,
            avatar: r.avatar,
            reply_id: r.reply_id,
            content: r.content,
            time: r.timestamp, // TODO user-friendly format
          })),
        );
      })
      .catch((err) => reject(err));
  });
}

export function postReply(replyToId, content) {
  return new Promise((resolve, reject) => {
    const header = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    const data = {
      content,
    };
    axios
      .post(`${API_URL}/rate/${replyToId}/reply`, data, { headers: header })
      .then((resp) => {
        log.info('POST reply resp', resp);
        resolve(resp);
      })
      .catch((err) => reject(err));
  });
}

export function deleteReply(replyId) {
  return new Promise((resolve, reject) => {
    // FIXME
    // const header = {
    //   Authorization: `Bearer ${store.state.user.jwt_token}`,
    // };
    axios
      .delete(`${API_URL}/rate/reply/${replyId}`)
      .then((resp) => {
        log.info('DELETE reply resp', resp);
        resolve(resp);
      })
      .catch((err) => reject(err));
  });
}

/*
 *  Description:
 *    Get all reactions to react_to_id
 *
 *  DTO:
 *  [
 *    {
 *      user_id: int,
 *      type: ":thumbup:",
 *      timestamp: int,
 *    },...
 *  ]
 *
 *
 */
export function getReactions(reactToId) {
  // FIXME
  const currentUserId = 1234;
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/reaction/${reactToId}`)
      .then((resp) => {
        const nameMap = {};

        resp.forEach((t) => {
          if (!nameMap.has(t.name))
            nameMap[t.name] = { cnt: 0, name: t.name, active: false, timestamp: t.timestamp };

          const item = nameMap[t.name];

          item.cnt += 1;
          item.timestamp = Math.min(t.timestamp, item.timestamp);
          if (t.user_id === currentUserId) item.active = true;
        });

        const result = Object.entries(nameMap)
          .sort((a, b) => {
            return a[1].timestamp - b[1].timestamp;
          })
          .map((x) => {
            return {
              name: x[0],
              cnt: x[1].cnt,
              active: x[1].active,
            };
          });

        log.info('GET reaction resp', resp);
        resolve(result);
      })
      .catch((e) => reject(e));
  });
}

export function postReaction(reactToId, type) {
  const header = {
    Authorization: `Bearer ${store.state.user.jwt_token}`,
  };
  return new Promise((resolve, reject) => {
    const data = {
      type,
    };
    axios
      .post(`${API_URL}/reaction/${reactToId}`, data, { headers: header })
      .then((resp) => {
        log.info('POST reaction resp', resp);
      })
      .catch((e) => reject(e));
  });
}

export function deleteReaction(reactToId, type) {
  return new Promise((resolve, reject) => {
    // const header = {
    //   Authorization: `Bearer ${store.state.user.jwt_token}`,
    // };
    const data = {
      type,
    };
    axios
      .delete(`${API_URL}/reaction/${reactToId}`, data)
      .then((resp) => {
        log.info('DELETE reaction resp', resp);
      })
      .catch((e) => reject(e));
  });
}
