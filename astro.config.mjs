import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";

import htmlTerser from "astro-html-terser";

import { imageParser } from './src/modules/markdown/remark/image-parser.mjs';
import { readingTime } from './src/modules/markdown/remark/reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.sujamess.com/',
  integrations: [
    sitemap({
      filter: page => !page.includes('/pages/')
    }),
    tailwind(),
    prefetch(),
    htmlTerser(),
  ],
  markdown: {
    remarkPlugins: [imageParser, readingTime]
  }
});
