import studio from '@sanity/eslint-config-studio';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  ...studio,
  eslintConfigPrettier // Disables all ESLint rules that might conflict with Prettier
];
