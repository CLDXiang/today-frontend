const palette = [
  '#c7ae95',
  '#c7c795',
  '#aec795',
  '#95c7ae',
  '#95aec7',
  '#ae95c7',
  '#c795ae',
  '#c79595',
  '#fb9fb1',
  '#eda987',
  '#ddb26f',
  '#acc267',
  '#12cfc0',
  '#6fc2ef',
  '#e1a3ee',
  '#deaf8f',
  '#f2777a',
  '#f99157',
  '#fc6',
  '#9c9',
  '#6cc',
  '#69c',
  '#c9c',
  '#d27b53',
  '#cc342b',
  '#f96a38',
  '#fba922',
  '#198844',
  '#3971ed',
  '#79a4f9',
  '#a36ac7',
  '#ec9998',
  '#cb6077',
  '#d28b71',
  '#f4bc87',
  '#beb55b',
  '#7bbda4',
  '#8ab3b5',
  '#a89bb9',
  '#bb9584',
  '#f92672',
  '#fd971f',
  '#f4bf75',
  '#a6e22e',
  '#a1efe4',
  '#66d9ef',
  '#ae81ff',
  '#c63',
  '#bf616a',
  '#d08770',
  '#ebcb8b',
  '#a3be8c',
  '#96b5b4',
  '#8fa1b3',
  '#b48ead',
  '#ab7967',
  '#ec5f67',
  '#f99157',
  '#fac863',
  '#99c794',
  '#5fb3b3',
  '#69c',
  '#c594c5',
  '#ab7967',
  '#ef6155',
  '#f99b15',
  '#fec418',
  '#48b685',
  '#5bc4bf',
  '#06b6ef',
  '#815ba4',
  '#e96ba8',
  '#da4939',
  '#cc7833',
  '#ffc66d',
  '#a5c261',
  '#519f50',
  '#6d9cbe',
  '#b6b3eb',
  '#bc9458',
  '#c66',
  '#de935f',
  '#f0c674',
  '#b5bd68',
  '#8abeb7',
  '#81a2be',
  '#b294bb',
  '#a3685a',
  '#cf6a4c',
  '#cda869',
  '#f9ee98',
  '#8f9d6a',
  '#afc4db',
  '#7587a6',
  '#9b859d',
  '#9b703f',
];

// 模拟 scss 的 darken 函数
function darken(oricolor: string, ratio: number, darker = true) {
  // #AAA to #AAAAAA
  const color = oricolor.replace(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i, '#$1$1$2$2$3$3');
  const difference = Math.round(ratio * 256) * (darker ? -1 : 1);
  const decimal = color
    .replace(
      /^#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/i,
      (...args) => `${parseInt(args[1], 16)},${parseInt(args[2], 16)},${parseInt(args[3], 16)}`,
    )
    .split(/,/);

  return [
    '#',
    Math[darker ? 'max' : 'min'](parseInt(decimal[0], 10) + difference, darker ? 0 : 255)
      .toString(16)
      .padStart(2, '0'),
    Math[darker ? 'max' : 'min'](parseInt(decimal[1], 10) + difference, darker ? 0 : 255)
      .toString(16)
      .padStart(2, '0'),
    Math[darker ? 'max' : 'min'](parseInt(decimal[2], 10) + difference, darker ? 0 : 255)
      .toString(16)
      .padStart(2, '0'),
  ].join('');
}

const colors: Record<string, unknown>[] = [];
const hoveredColors: Record<string, unknown>[] = [];

// 模拟 scss mixin
for (let i = 0; i < palette.length; i += 1) {
  colors.push({
    borderColor: darken(palette[i], 0.2),
    color: darken(palette[i], 0.4),
    backgroundColor: palette[i],
  } as Record<string, unknown>);
  hoveredColors.push({
    backgroundColor: darken(palette[i], 0.1),
  });
}

const primaryColor = {
  color: '#60bdca',
};

export { colors, hoveredColors, primaryColor };
