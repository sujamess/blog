import { defineCollection } from 'astro:content'
import { blogSchema } from '@content/schemas/_blog';

export const collections = {
  'blog': defineCollection({ schema: blogSchema }),
}
