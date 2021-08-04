import { Asset } from './asset';

export interface Blog {
  slug: string;
  title: string;
  coverImg: Asset;
  createdAt: string;
  description: string;
  content: string;
  tags: string[];
}

export interface GetBlogsResult {
  data: {
    sujamesBlogCollection: {
      items: Blog[],
    },
  };
}