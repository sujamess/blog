export const markdownToString = async (markdownString: string): Promise<string> => {
  const { default: remark } = await import ('remark');
  const { default: remarkHtml } = await import ('remark-html');

  return (await remark().use(remarkHtml).process(markdownString)).toString();
};
