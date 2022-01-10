module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'eol-last': ['error', 'always'],
    'jsx-quotes': ['error', 'prefer-single'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'max-lines': ['error', 1000],
    'comma-dangle': ['error', 'never'],
    'no-unused-vars': 'error',
    'no-process-env': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        semi: false,
        'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
        'no-unused-vars': ['error'],
        singleQuote: true,
        jsxSingleQuote: true,
        endOfLine: 'auto',
        trailingComma: 'none'
      }
    ]
  }
}
