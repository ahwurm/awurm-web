import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Redirect stubs + 404 are excluded from the sitemap.
export default defineConfig({
  site: 'https://awurm.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) =>
        !/\/(404|about|talks|apps|applications)\/?$/.test(new URL(page).pathname),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
