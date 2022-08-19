export default {
  stories: 'stories/**/*.stories.{js,jsx,ts,tsx}',
  base: process.env.VITE_BASE
    ? process.env.VITE_BASE + 'stories/'
    : '/stories/',
};
