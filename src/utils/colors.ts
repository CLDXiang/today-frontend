/** 随机色板可选类名数组 */
const colorClassNames = [
  'bg-red-300 border-red-500 text-red-600',
  'bg-orange-300 border-orange-500 text-orange-600',
  'bg-amber-300 border-amber-500 text-amber-600',
  'bg-yellow-300 border-yellow-500 text-yellow-600',
  'bg-lime-300 border-lime-500 text-lime-600',
  'bg-green-300 border-green-500 text-green-600',
  'bg-emerald-300 border-emerald-500 text-emerald-600',
  'bg-teal-300 border-teal-500 text-teal-600',
  'bg-cyan-300 border-cyan-500 text-cyan-600',
  'bg-light-blue-300 border-light-blue-500 text-light-blue-600',
  'bg-blue-300 border-blue-500 text-blue-600',
  'bg-indigo-300 border-indigo-500 text-indigo-600',
  'bg-violet-300 border-violet-500 text-violet-600',
  'bg-purple-300 border-purple-500 text-purple-600',
  'bg-fuchsia-300 border-fuchsia-500 text-fuchsia-600',
  'bg-pink-300 border-pink-500 text-pink-600',
  'bg-rose-300 border-rose-500 text-rose-600',
];

/** 将数值映射为颜色类名字符串 */
export const hashColorClassNames = (value: string | number) => {
  /** 可选颜色总数 */
  const colorNumber = colorClassNames.length;
  const parsedValue = typeof value === 'string' ? parseInt(value, 10) : value;
  return colorClassNames[parsedValue % colorNumber];
};

export default colorClassNames;
