module.exports = {
    env: {
      node: true, // For backend
      browser: true, // For frontend
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true, // For React
      },
    },
    plugins: ['@typescript-eslint'],
    rules: {
      // Common ESLint rules for both frontend and backend
      'no-console': 'warn',
      'no-unused-vars': ['error', { args: 'none' }],
      'no-undef': 'error',
      // Add your project-specific ESLint rules here
    },
    overrides: [
      // Override ESLint configuration for specific files or directories
      {
        files: ['**/*.js'], // Apply overrides to JavaScript files
        rules: {
          // Ignore errors for module, require, and process keywords
          'no-undef': ['error', { 'typeof': false }],
          'no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
          'no-restricted-globals': ['error', { 'name': 'module', 'message': 'Use import/export instead.' }],
          'no-restricted-syntax': ['error', { selector: 'CallExpression[callee.name="require"]', message: 'Use import/export instead.' }],
          'no-restricted-modules': ['error', { 'patterns': ['*'], 'message': 'Use import/export instead.' }],
          'no-restricted-properties': ['error', { 'object': 'process', 'property': 'env', 'message': 'Use process.env instead.' }],
        },
      },
    ],
  };
  