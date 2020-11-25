import Link from 'next/link';
import Image from 'next/image';
import { formatDate, formatReadingTime } from 'utils/formatter';

interface ICardProps {
  id: string;
  title: string;
  category: string;
  readingTime: number;
  description: string;
  date: string;
}

const Card = ({ id, title, category, readingTime, date, description }: ICardProps) => {
  return (
    <div className="p-4 xl:w-1/3">
      <div className="h-full flex flex-col shadow-lg border-2 border-gray-200 rounded-lg overflow-hidden">
        <Link href={`/${id}`}>
          <a>
            <Image width="720" height="400" src="/cover_image.jpg" />
          </a>
        </Link>
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">{category}</h2>
          <Link href={`/${id}`}>
            <a>
              <h1 className="title-font text-lg font-medium text-gray-900">{title}</h1>
            </a>
          </Link>
          <span className="text-gray-600 lg:ml-auto md:ml-0 ml-auto leading-none text-sm border-gray-300 mb-3">
            {formatDate(date)}
          </span>
          <p className="leading-relaxed mb-3">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
