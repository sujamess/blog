import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import remark from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

const blogDirectory = join(process.cwd(), 'blogs');

export interface IBlogData {
  id: string;
  title: string;
  description: string;
  contentHtml: string;
  date: string;
  estimatedTime: number;
}

export const getSortedPostsData = async (): Promise<IBlogData[]> => {
  // Get file names under /blogs
  const fileNames = readdirSync(blogDirectory);

  const blogsData = await Promise.all(fileNames.map(async fileName => {
    // Remove `.md` from file name to get the id
    const blogId = fileName.replace(/\.md$/, '');
    
    // Read markdown file as string
    const blogPath = join(blogDirectory, fileName);
    const blogContent = readFileSync(blogPath, 'utf-8');

    // Use `gray-matter` to parse the blog metadata section
    const { data, content } = matter(blogContent);

    // Use remark to convert markdown into the HTML string
    const processedContent = await remark().use(html).use(prism).process(content);
    const contentHtml = processedContent.toString();

    // Estimated time
    const estimatedTime = (contentHtml.replace(/\s/g, '').length - 7) / 200 + 1;

    // Combine the data with the id
    return {
      id: blogId,
      contentHtml,
      ...(data as { title: string, description: string, date: string }),
      estimatedTime: Math.ceil(estimatedTime),
    };
  }));

  return blogsData.sort((a, b) => {
    if (a.date < b.date) {
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
  const blogPath = join(blogDirectory, `${id}.md`);
  const blogContent = readFileSync(blogPath, 'utf-8');

  // Use `gray-matter` to parse the blog metadata section
  const grayMatterResult = matter(blogContent);

  // Use remark to convert markdown into the HTML string
  const processedContent = await remark().use(html).process(grayMatterResult.content);
  const contentHtml = processedContent.toString();

  // Estimated time
  const estimatedTime = contentHtml.replace(' ', '').length / 200 + 1;

  // Combine the data with the id and content HTML
  return {
    id,
    contentHtml,
    ...(grayMatterResult.data as { title: string, description: string, date: string }),
    estimatedTime: Math.ceil(estimatedTime),
  };
};
