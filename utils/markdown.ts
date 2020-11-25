import remark from 'remark'
import html from 'remark-html'
import prism from 'remark-prism';

const markdownToHTML = async (markdown: any) => {
  const result = await remark().use(html).use(prism).process(markdown);

  return result.toString();
};

export default markdownToHTML;
