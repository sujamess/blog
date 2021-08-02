interface ITagsProps {
  tags: string[];
}

const Tags = ({ tags }: ITagsProps) => {
  return (
    <div className="flex flex-auto my-1">
      {tags.map((tag, idx) => (
        <div className="bg-blue-200 rounded-lg py-1 px-1" key={idx}>
          <p className="text-blue-900 tracking-widest text-xs title-font font-medium">
            {tag}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Tags
