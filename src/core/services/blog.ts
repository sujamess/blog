import { CollectionEntry, getCollection } from 'astro:content';

export const getBlogCollection = async (): Promise<CollectionEntry<'blog'>[]> => {
    const [blogs] = await Promise.all([getCollection('blog')]);
    return blogs;
}