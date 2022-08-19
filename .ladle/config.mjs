export default {
  stories: 'stories/**/*.stories.{js,jsx,ts,tsx}',
  // Use optional chaining as the config ends up in the browser build.
  base: process?.env?.VITE_BASE
    ? process?.env?.VITE_BASE + 'stories/'
    : '/stories/',
};
