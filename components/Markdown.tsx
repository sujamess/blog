import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import gfm from 'remark-gfm';

interface IMarkdownProps {
  content: string;
}

const syntaxHighlighterRenderer = {
  code: ({ language, value }) => (
    <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>
  ),
};

const Markdown = ({ content }: IMarkdownProps) => {
  return (
    <ReactMarkdown plugins={[gfm]} renderers={syntaxHighlighterRenderer} className="prose max-w-full">
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
