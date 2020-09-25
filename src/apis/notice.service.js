// import axios from 'axios';
// import { API_URL } from '@/utils/config';
// import log from '@/utils/log';
// import { getRateByRateId } from './rate';
// import { getUserProfile } from './profile.service';
// import store from '../store';

// export async function getNotifications() {
//   return new Promise((resolve, reject) => {
//     const authHeader = {
//       Authorization: `Bearer ${store.state.user.jwt_token}`,
//     };
//     axios
//       .get(`${API_URL}/notice/notice`, {
//         headers: authHeader,
//       })
//       .then((resp) => {
//         const re = [];
//         resp.data.forEach(async (element) => {
//           if (element.type === 'reply') {
//             await getRateByRateId(element.notice_about_id)
//               .then((rateInfo) => {
//                 element.notice_about_id = rateInfo.lecture_id;
//               })
//               .catch((err) => {
//                 log.error(err);
//               });
//           }
//           await getUserProfile(element.from_user_id)
//             .then((userProfile) => {
//               re.push({ ...element, userProfile });
//             })
//             .catch((err) => {
//               log.error(err);
//             });
//         });
//         resolve(re);
//       })
//       .catch((error) => reject(error));
//   });
// }

// export async function getTrends() {
//   return new Promise((resolve, reject) => {
//     const authHeader = {
//       Authorization: `Bearer ${store.state.user.jwt_token}`,
//     };
//     axios
//       .get(`${API_URL}/notice/rate`, {
//         headers: authHeader,
//       })
//       .then((resp) => {
//         const re = [];
//         resp.data.forEach(async (element) => {
//           await getUserProfile(element.from_user_id)
//             .then((userProfile) => {
//               re.push({ ...element, userProfile });
//             })
//             .catch((err) => {
//               log.error(err);
//             });
//         });
//         resolve(re);
//       })
//       .catch((error) => reject(error));
//   });
// }

// export async function deleteNotice(noticeId) {
//   return new Promise((resolve, reject) => {
//     const authHeader = {
//       Authorization: `Bearer ${store.state.user.jwt_token}`,
//     };
//     axios
//       .delete(`${API_URL}/notice/${noticeId}`, { headers: authHeader })
//       .then((resp) => {
//         // log.info(resp);
//         resolve(resp.data);
//       })
//       .catch((error) => reject(error));
//   });
// }

// export async function readNotice(noticeId) {
//   return new Promise((resolve, reject) => {
//     const authHeader = {
//       Authorization: `Bearer ${store.state.user.jwt_token}`,
//     };
//     axios
//       .post(`${API_URL}/notice/${noticeId}`, {}, { headers: authHeader })
//       .then((resp) => {
//         // log.info(resp);
//         resolve(resp.data);
//       })
//       .catch((error) => reject(error));
//   });
// }

// export async function readAllNotifications() {
//   return new Promise((resolve, reject) => {
//     const authHeader = {
//       Authorization: `Bearer ${store.state.user.jwt_token}`,
//     };
//     axios
//       .post(`${API_URL}/notice/notice`, { headers: authHeader })
//       .then((resp) => {
//         // log.info(resp);
//         resolve(resp.data);
//       })
//       .catch((error) => reject(error));
//   });
// }

// export async function readAllTrends() {
//   return new Promise((resolve, reject) => {
//     const authHeader = {
//       Authorization: `Bearer ${store.state.user.jwt_token}`,
//     };
//     axios
//       .post(`${API_URL}/notice/rate`, { headers: authHeader })
//       .then((resp) => {
//         // log.info(resp);
//         resolve(resp.data);
//       })
//       .catch((error) => reject(error));
//   });
// }
