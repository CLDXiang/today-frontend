function getId(day, section) {
  return `day${day}section${section}`;
}
function getCellByPosition(day, section) {
  return document.querySelector(`#${getId(day, section)}`);
}
function spans2slots(spans) {
  const slots = new Set();
  spans.forEach((s) => {
    for (let i = s.start; i <= s.end; i += 1) {
      slots.add(`${s.day} ${i}`);
    }
  });
  const res = [];
  slots.forEach((s) => {
    const t = s.split(' ');
    res.push({ d: parseInt(t[0], 10), s: parseInt(t[1], 10) });
  });
  res.sort((a, b) => {
    if (a.d < b.d || (a.d === b.d && a.s < b.s)) {
      return -1;
    }
    return 1;
  });
  return res;
}

function spans2segments(spans) {
  // add some tests please ...
  const slots = spans2slots(spans);
  const segs = [];
  let day = -1;
  let start;
  let end;
  for (let i = 0; i < slots.length; i += 1) {
    const s = slots[i];
    if (s.d !== day || end + 1 !== s.s) {
      if (day !== -1) {
        segs.push({ d: day, s: start, e: end });
      }
      day = s.d;
      start = s.s;
      end = s.s - 1;
    }
    end += 1;
  }
  segs.push({ d: day, s: start, e: end });
  return segs;
}
export { spans2segments, getCellByPosition, getId, spans2slots };
