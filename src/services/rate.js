import axios from 'axios';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

import log from '../utils/log';
import store from '../store';

import { emojiIntToStr } from './react';

import { API_URL } from '../utils/config';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const defaultAvatar = require('../assets/default_avatar.png');

const defaultBio = '然鹅这位童鞋并没有留下什么话语';

function getAvatar(avatarUrl) {
  if (avatarUrl && avatarUrl.includes('DEFAULT')) return defaultAvatar;
  return avatarUrl;
}
function getBio(bio) {
  return bio || defaultBio;
}

/**
 ******************************
 * @API
 ******************************
 */

export function getRateIds(lectureId, rateBy) {
  const params =
    rateBy === 'default'
      ? {}
      : {
          rateBy,
        };

  if (store.state.user.jwt_token) {
    const headers = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/rate/lecture/auth/${lectureId}`, { headers, params })
        .then((resp) => {
          log.info('GET rate ids resp', resp);
          resolve({ rateIds: resp.data.rates });
        })
        .catch((err) => reject(err));
    });
  }

  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/rate/lecture/${lectureId}`, { params })
      .then((resp) => {
        log.info('GET rate ids resp', resp);
        resolve({ rateIds: resp.data.rates });
      })
      .catch((err) => reject(err));
  });
}

export function getRateBatch(ids) {
  const headers = {
    Authorization: `Bearer ${store.state.user.jwt_token}`,
  };
  const userId = store.state.user.jwt_token
    ? JSON.parse(window.atob(store.state.user.jwt_token.split('.')[1])).sub
    : 0;
  return new Promise((resolve, reject) => {
    const params = { ids, userId };
    axios
      .all([
        axios.get(`${API_URL}/rate/lecture`, { params, headers }),
        ...ids.map((id) => axios.get(`${API_URL}/rate/${id}/reply`)),
      ])
      .then(
        axios.spread((rates, ...replyIds) => {
          const rateId2replyIds = new Map(replyIds.map((resp, i) => [ids[i], resp.data]));
          const rateId2data = new Map(rates.data.map((data) => [data.id, data]));

          const resp = ids.map((i) => {
            const data = rateId2data.get(i);
            return {
              id: data.id,
              userName: data.username,
              userId: data.user_id,
              avatar: getAvatar(data.avatar),
              time: dayjs(data.last_update).fromNow(),
              content: data.content,
              replyIds: rateId2replyIds.get(data.id),
              replyCnt: rateId2replyIds.get(data.id).length,
              reactions: data.reacts.map((r) => ({
                id: emojiIntToStr.get(r.emoji),
                cnt: r.count,
                active: r.reacted > 0,
                reactId: r.reacted,
              })),
            };
          });
          log.info('GET rate batch resp', resp);
          resolve(resp);
        }),
      )
      .catch((err) => reject(err));
  });
}

export function getLectureRateInfo(id) {
  const headers = {
    Authorization: `Bearer ${store.state.user.jwt_token}`,
  };

  return new Promise((resolve, reject) => {
    log.info('...getting lecture rate info');
    axios
      .all([
        axios.get(`${API_URL}/course/${id}/star`, { headers }),
        axios.get(`${API_URL}/rate/lecture/${id}`, { headers }),
      ])
      .then(
        axios.spread((starInfo, rateInfo) => {
          log.info('GET lecture rate info', starInfo, rateInfo);

          resolve({
            favorCount: starInfo.data.count,
            favored: starInfo.data.stared,

            rateIds: rateInfo.data.rates,
            rateCount: rateInfo.data.rates.length,

            difficultyName: ['随便浪', '摸鱼', '一般', '适度肝', '头皮发麻'][
              Math.round(rateInfo.data.avg_difficulty + 2)
            ],
            gradingName: ['慎选', '差', '一般', '还行', '良心'][
              Math.round(rateInfo.data.avg_grading + 2)
            ],
            workloadName: ['很少', '较少', '一般', '多', '巨多'][
              Math.round(rateInfo.data.avg_workload + 2)
            ],

            // TODO
            score: 4,
          });
        }),
      )
      .catch((e) => reject(e));
  });
}

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

export function getReplies(ids) {
  const headers = {
    Authorization: `Bearer ${store.state.user.jwt_token}`,
  };
  const userId = store.state.user.jwt_token
    ? JSON.parse(window.atob(store.state.user.jwt_token.split('.')[1])).sub
    : 0;

  return new Promise((resolve, reject) => {
    const params = { ids, userId };
    axios
      .get(`${API_URL}/rate/reply`, { params, headers })
      .then((resp) => {
        log.info('GET replies resp', resp);
        resolve(
          resp.data.map((data) => ({
            id: data.id,
            userId: data.userId,
            userName: data.username,
            avatar: getAvatar(data.avatar),
            time: dayjs(data.lastUpdate).fromNow(),
            content: data.content,
          })),
        );
      })
      .catch((e) => reject(e));
  });
}

export function postReply(type, id, content) {
  return new Promise((resolve, reject) => {
    const header = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    const data = {
      type,
      content,
    };
    axios
      .post(`${API_URL}/rate/${id}/reply`, data, { headers: header })
      .then((resp) => {
        log.info('POST reply resp', resp);
        getReplies([resp.data.id])
          .then((d) => {
            resolve(d[0]);
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
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

export function getUserInfo(id) {
  const info = {
    intro: 'hhhh',
    nfollowers: 0,
    nreplies: 0,
    nrates: 0,
    followed: false,
  };

  const headers = {
    Authorization: `Bearer ${store.state.user.jwt_token}`,
  };
  const userId = store.state.user.jwt_token
    ? JSON.parse(window.atob(store.state.user.jwt_token.split('.')[1])).sub
    : 0;

  return new Promise((resolve, reject) => {
    // TODO: reply cnt
    axios
      .all([
        axios.get(`${API_URL}/user/rates/${id}`, { headers }),
        axios.get(`${API_URL}/user/${id}/follower`, { headers }),
        axios.get(`${API_URL}/user/profile`, { headers, params: { userId: id } }),
      ])
      .then(
        axios.spread((rates, followers, profile) => {
          info.intro = getBio(profile.data.bio);
          info.nrates = rates.data.length;
          info.nfollowers = followers.data.length;
          info.followed = followers.data.filter((obj) => obj.id === userId).length > 0;

          log.info('GET user info RESP', info);
          resolve(info);
        }),
      )
      .catch((e) => reject(e));
  });
}

export function postFollow(id) {
  const header = {
    Authorization: `Bearer ${store.state.user.jwt_token}`,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/user/${id}/following`, {}, { headers: header })
      .then((resp) => {
        log.info('POST following resp', resp);
        resolve(resp.data);
      })
      .catch((e) => reject(e));
  });
}

export function deleteFollow(id) {
  const header = {
    Authorization: `Bearer ${store.state.user.jwt_token}`,
  };
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API_URL}/user/${id}/following`, { headers: header })
      .then((resp) => {
        log.info('DELETE following resp', resp);
        resolve(resp.data);
      })
      .catch((e) => reject(e));
  });
}
