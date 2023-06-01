module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
    'max-len': ['warn', 100],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-closing-tag-location': 'warn',
    'react/jsx-closing-bracket-location': 'warn',
    'react/jsx-curly-spacing': ['warn', { when: 'always', children: true }],
    'react/jsx-curly-newline': 'warn',
    'react/jsx-indent': ['warn', 2],
    'react/jsx-space-before-closing': 'warn',
    'react/jsx-wrap-multilines': 'error',
    'react/jsx-indent-props': 'warn',
    'react/jsx-max-props-per-line': ['warn', { when: 'multiline' }]
  }
}
