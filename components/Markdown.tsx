import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import gfm from 'remark-gfm';

interface IMarkdownProps {
  content: string;
}

const syntaxHighlighterRenderer = {
  code: ({ language, value }) => {
    return <SyntaxHighlighter language={language} children={value} />
  },
};

const Markdown = ({ content }: IMarkdownProps) => {
  return (
    <ReactMarkdown plugins={[gfm]} renderers={syntaxHighlighterRenderer}>
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
