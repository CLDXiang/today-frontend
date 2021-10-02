module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 1,
    'no-debugger': 1,
    'max-len': [
      'warn',
      {
        code: 100,
        ignorePattern: '^\\s*(class|d)=("[^"]+"|\\{`)',
        ignoreComments: true,
      },
    ],
    'prefer-promise-reject-errors': 0,
    'implicit-arrow-linebreak': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'linebreak-style': 0,
    'no-param-reassign': ['error', { props: false }],
  },
};
