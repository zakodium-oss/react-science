// Use optional chaining as the config ends up in the browser build.
const viteBase = globalThis.process?.env?.VITE_BASE;

export default {
  stories: 'stories/**/*.stories.{js,jsx,ts,tsx}',
  base: viteBase ? viteBase + 'stories/' : '/stories/',
};
