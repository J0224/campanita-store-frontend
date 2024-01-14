module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: ['standard-with-typescript', 'plugin:@typescript-eslint/recommended-type-checked'],
    overrides: [
      {
        env: {
          node: true,
        },
        files: ['.eslintrc.{js,cjs}'],
        parserOptions: {
          sourceType: 'script',
        },
      },
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: ['./tsconfig.json', './tsconfig.node.json'],
    },
    plugins: ['react'],
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  };
  