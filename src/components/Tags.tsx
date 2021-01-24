interface ITagsProps {
  tags: string[];
}

const Tags = ({ tags }: ITagsProps) => {
  return (
    <div className="flex flex-auto my-1">
      {tags.map((tag) => (
        <div className="bg-green-200 rounded-lg py-1 px-1">
          <p className="text-green-900 tracking-widest text-xs title-font font-medium">
            {tag}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Tags
