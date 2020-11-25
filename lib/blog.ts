import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const blogDirectory = join(process.cwd(), 'blogs');

interface IMetaData {
  title: string;
  category: string;
  description: string;
  date: string;
  readingTime: number;
}

export interface IBlogData {
  id: string;
  metaData: IMetaData;
  content: string;
}

export const getSortedPostsData = async (): Promise<IBlogData[]> => {
  // Get file names under /blogs
  const fileNames = readdirSync(blogDirectory);

  const blogsData: IBlogData[] = await Promise.all(fileNames.map(async fileName => {
    // Remove `.md` from file name to get the id
    const blogId = fileName.replace(/\.md$/, '');

    return await getBlogData(blogId);
  }));

  return blogsData.sort((a, b) => {
    if (a.metaData.date < b.metaData.date) {
      return 1;
    }

    return -1;
  });
};

export const getBlogsId = () => {
  const fileNames = readdirSync(blogDirectory);

  return fileNames.map(fileName => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
};

export const getBlogData = async (id: string): Promise<IBlogData> => {
  // Read markdown file as string
  const blogPath = join(blogDirectory, `${id}.md`);
  const blogContent = readFileSync(blogPath, 'utf-8');

  // Use `gray-matter` to parse the blog metadata section
  const { data, content } = matter(blogContent);

  // Combine the data with the id
  return {
    id,
    content,
    metaData: { ...(data as IMetaData) },
  };
};
