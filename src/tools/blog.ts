import { Blog, getBlogsFragment } from '../core/constants/blog';

import { getBlurHash } from '../core/services/image';
import type { BlurHashResponse } from '../core/services/image';

interface RawQueryResult {
    data: {
        blogCollection: {
            items: Blog[],
        },
    };
}

interface ProcessedBlog extends Omit<Blog, 'bannerImg'> {
    bannerImg: {
        url: string;
        width: number;
        height: number;
        placeholder: BlurHashResponse;
    };
}

interface GetBlogsOption {
    isPreview?: boolean;
}

export const getBlogs = async (option: GetBlogsOption): Promise<ProcessedBlog[]> => {
    const { isPreview = false } = option;

    console.log('blog: fetching blogs from Contentful...');

    const rawResult: RawQueryResult = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${
                isPreview
                    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                    : process.env.CONTENTFUL_ACCESS_TOKEN
            }`
        },
        method: 'POST',
        body: JSON.stringify({
            query: `
                query {
                    blogCollection(order: [createdAt_DESC], preview: ${isPreview}) {
                        items {
                            ...BlogFragment
                        }
                    }
                }
                ${getBlogsFragment}
            `,
        })
    })
        .then(res => res.json());

    console.log(`blog: fetched ${rawResult.data.blogCollection.items.length} blogs from Contentful`);
    console.log(`blog: blogs processing`);

    const result = await Promise.all(
        rawResult.data.blogCollection.items.map(async blog => ({
            ...blog,
            bannerImg: {
                ...blog.bannerImg,
                placeholder: await getBlurHash(blog.bannerImg),
            },
        })),
    );
    
    console.log('blog: blogs processed');

    return result;
}

