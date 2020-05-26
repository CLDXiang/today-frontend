// import rawLectures from '../assets/lectures.json';

// // Preprocess raw data exported from backend
// const lectures = rawLectures
//   .map((d) => {
//     return {
//       id: d.id,
//       name: d.name,
//       code: d.code,
//       credit: d.credit,
//       teacher: d.taught_by.replace(/@@/g, ', ').trim(), // 替换多位老师授课的'@@'
//       idx: d.lecture_index,
//     };
//   })
//   // drop empty teacher
//   .filter((d) => {
//     return d.teacher.length > 0;
//   });

// const id2lecture = {};
// lectures.forEach((data) => {
//   id2lecture[`${data.id}`] = data;
// });

// export default function getLectureById(id) {
//   return id2lecture[`${id}`];
// }
