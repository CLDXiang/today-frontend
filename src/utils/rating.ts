export const scoreTextTable = {
  difficulty: ['极难', '困难', '正常', '轻松', '小学'],
  nice: ['极差', '害怕', '海星', '善良', '天使'],
  workload: ['负担', '略多', '合理', '摸鱼', '躺好'],
  recommended: ['避雷', '谨慎', '还行', '推荐', '安利'],
};

/** 从评课分数到对应文案的映射 */
export const mapScoreToText: (
  type: 'difficulty' | 'nice' | 'workload' | 'recommended',
  score: number,
) => string = (type, score) => {
  if (score < 1 || score > 5) {
    return '';
  }

  return scoreTextTable[type][Math.round(score) - 1];
};
