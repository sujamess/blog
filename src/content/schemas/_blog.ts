import { z } from 'astro:content';

export const blogSchema = z.object({
    title: z.string(),
    createdAt: z.date(),
    bannerImg: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
        placeholder: z.string(),
        blurHashCode: z.string(),
    }),
    description: z.string(),
    tags: z.array(z.string()),
})
