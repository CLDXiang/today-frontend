import courses from '../assets/courses.json';

const code2course = {};

courses.forEach((data) => {
  code2course[`${data.code}.${data.idx}`] = data;
});

export { courses };

export function getCourseByCodeAndIdx(code, idx) {
  return code2course[`${code}.${idx}`];
}

export function filterCoursesByType(type) {
  if (type === 'English') {
    return courses.filter((data) => {
      return data.code.includes('ENGL110');
    });
  }

  if (type === 'Politics') {
    return courses.filter((data) => {
      return data.code.includes('PTSS110') || data.code.includes('STUO110');
    });
  }

  if (type === 'Physics') {
    return courses.filter((data) => {
      return data.code.includes('PEDU110');
    });
  }

  return [];
}

export function filterCourses(keyword, topk = 30) {
  return courses
    .filter((data) => {
      return (
        data.name.includes(keyword) || data.code.includes(keyword) || data.teacher.includes(keyword)
      );
    })
    .slice(0, topk);
}
