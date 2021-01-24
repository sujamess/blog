import Link from 'next/link';
import Image from 'next/image';
import Divider from './Divider';
import Tags from './Tags';

interface ICardProps {
  index: number;
  slug: string;
  title: string;
  tags: string[];
  description: string;
  coverImgUrl: string;
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
}: ICardProps) => {
  return (
    <Link href={`/${slug}`}>
      <a>
        <div className="rounded-2xl overflow-hidden shadow-xl px-4 pb-4">
          <Image
            objectFit="contain"
            alt={title}
            src={coverImgUrl}
            width={592}
            height={320}
            layout="responsive"
          />

          <div className="p-6">
            <Tags tags={tags} />
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
