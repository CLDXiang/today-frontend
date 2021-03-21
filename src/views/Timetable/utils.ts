/** 判断两个 Set 内容是否相同 */
export function areSetsSame(set1: Set<number>, set2: Set<number>) {
  if (set1.size !== set2.size) return false;
  const intersect = [...set1].filter((item) => set2.has(item));
  return intersect.length === set1.size;
}

/** 将原始 JSON 中代表周 X 的 number 映射为汉字 */
export function mapDay(day: number) {
  return ['一', '二', '三', '四', '五', '六', '日'][day - 1];
}

/** 将 "3-5" 格式的字符串节数转为 [2, 3, 4] 索引数组（从 0 开始） */
export function parseSections(sectionString: string): number[] {
  const [sectionStart, sectionEnd] = sectionString.split('-').map((i) => parseInt(i, 10));
  const sectionsArray = [];
  for (let i = sectionStart; i <= sectionEnd; i += 1) {
    sectionsArray.push(i - 1);
  }
  return sectionsArray;
}
