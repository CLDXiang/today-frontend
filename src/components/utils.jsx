var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};
function getId(day, section) {
  return `day${day}section${section}`;
}
function getCellByPosition(day, section) {
  return document.querySelector(`#${getId(day, section)}`);
}
function spans2slots(spans) {
  var slots = new Set();
  spans.forEach((s) => {
    for (var i = s.start; i <= s.end; ++i) {
      slots.add(s.day + ' ' + i);
    }
  });
  var res = new Array();
  slots.forEach((s) => {
    var t = s.split(' ');
    res.push({ d: parseInt(t[0]), s: parseInt(t[1]) });
  });
  res.sort((a, b) => {
    return a.d < b.d ? -1 : (a.d == b.d && a.s < b.s ? -1 : 1);
  });
  return res;
}

function spans2segments(spans) {
  // add some tests please ...
  var slots = spans2slots(spans);
  var segs = new Array();
  var day = -1,
    start,
    end;
  for (var i = 0; i < slots.length; ++i) {
    var s = slots[i];
    if (s.d != day || end + 1 != s.s) {
      if (day != -1) {
        segs.push({ d: day, s: start, e: end });
      }
      day = s.d;
      start = s.s;
      end = s.s - 1;
    }
    ++end;
  }
  segs.push({ d: day, s: start, e: end });
  return segs;
}
export { getJSON, spans2segments, getCellByPosition, getId, spans2slots };
