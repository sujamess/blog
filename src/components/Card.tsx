import Link from 'next/link';
import Image from 'next/image';
import Divider from './Divider';

interface ICardProps {
  index: number;
  slug: string;
  title: string;
  tags: string[];
  description: string;
  coverImgUrl: string;
  coverImgWidth: number;
  coverImgHeight: number;
  date: string;
}

const Card = ({
  index,
  slug,
  title,
  tags,
  date,
  description,
  coverImgUrl,
  coverImgWidth,
  coverImgHeight,
}: ICardProps) => {
  return (
    <Link href={`/${slug}`}>
      <a>
        <div className="flex flex-col shadow-lg border-2 border-gray-200 rounded-lg overflow-hidden">
          <Image
            alt={title}
            src={coverImgUrl}
            width={coverImgWidth}
            height={coverImgHeight}
            layout="responsive"
          />

          <div className="p-6">
            <h2 className="text-cyan-500 tracking-widest text-xs title-font font-medium mb-1">{tags[0]}</h2>
            <Link href={`/${slug}`}>
              <a>
                <h1 className="title-font text-2xl font-medium text-gray-900">{title}</h1>
              </a>
            </Link>
            <span className="text-gray-600">
              {date}
            </span>
            <Divider />
            <p className="text-gray-600 pt-2">{description}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
