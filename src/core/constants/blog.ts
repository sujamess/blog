import type { Image } from '@core/constants/image';

export interface Blog {
    slug: string;
    title: string;
    createdAt: string;
    bannerImg: Image;
    description: string;
    content: string;
    tags: string[];
}

export const getBlogsFragment = `
fragment BlogFragment on Blog {
    slug,
    title,
    bannerImg {
        url,
        placeholder: url(transform: { quality: 70 }),
        width,
        height,
    },
    createdAt,
    description,
    content,
    tags,
}
`