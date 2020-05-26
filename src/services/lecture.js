import axios from 'axios';

export const lectures = [];
export const code2lecture = {};
export const id2lecture = {};

export async function initLecture() {
  if (lectures.length !== 0) return;

  const resp = await axios.get('/lectures.json');
  if (lectures.length !== 0) return;

  resp.data
    .map((d) => ({
      id: d.id,
      name: d.name,
      code: d.code,
      credit: d.credit,
      teacher: d.taught_by.replace(/@@/g, ', ').trim(),
      idx: d.lecture_index,
    }))
    // drop empty teacher
    .filter((d) => {
      return d.teacher.length > 0;
    })
    .forEach((d) => {
      lectures.push(d);
    });

  lectures.forEach((data) => {
    code2lecture[`${data.code}.${data.idx}`] = data;
  });

  lectures.forEach((data) => {
    id2lecture[`${data.id}`] = data;
  });
}

export function getLectureByCodeAndIdx(code, idx) {
  return code2lecture[`${code}.${idx}`];
}

export function getLectureById(id) {
  return id2lecture[`${id}`];
}

export function filterLecturesByType(type) {
  if (type === 'English') {
    return lectures.filter((data) => {
      return data.code.includes('ENGL110');
    });
  }

  if (type === 'Politics') {
    return lectures.filter((data) => {
      return data.code.includes('PTSS110') || data.code.includes('STUO110');
    });
  }

  if (type === 'Physics') {
    return lectures.filter((data) => {
      return data.code.includes('PEDU110');
    });
  }

  return [];
}

export function filterLectures(keyword, topk = 30) {
  return lectures
    .filter((data) => {
      return (
        data.name.includes(keyword) || data.code.includes(keyword) || data.teacher.includes(keyword)
      );
    })
    .slice(0, topk);
}
