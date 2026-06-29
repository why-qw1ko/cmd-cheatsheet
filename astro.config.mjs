import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://why-qw1ko.github.io',
  base: '/cmd-cheatsheet',
  vite: {
    plugins: [tailwindcss()],
  },
});
