module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // Seems stupid to need React in scope unused
    'react/react-in-jsx-scope': 'off',

    // I don't care about default exports
    'import/prefer-default-export': 'off',

    // I want to destructure on one line
    'object-curly-newline': 'off',

    // I don't want any unnecessary boilerplate
    'react/require-default-props': 'off',

    // Bit longer lines are fine
    'max-len': ['error', {
      code: 120,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],

    // I don't care about 2+ JSX elements in one line
    'react/jsx-one-expression-per-line': 'off',

    // I prefer operatrors before linebreaks
    'operator-linebreak': ['error', 'after'],

    // I don't care about parentheses around multi-line elements
    'react/jsx-wrap-multilines': 'off',

    // I think multiple props per line can be fine
    'react/jsx-max-props-per-line': 'off',

    // I don't care about extraneous dependencies
    'import/no-extraneous-dependencies': 'off',

    // I want to use for..of loops every now and then
    'no-restricted-syntax': 'off',

    // I want to await in a loop some times
    'no-await-in-loop': 'off',

    // I want to do a manual break in a loop
    'no-constant-condition': 'off',

    // Just let me log, man
    'no-console': 'off',

    // Sometiems this is necessary
    'no-param-reassign': 'off',
  },
};
