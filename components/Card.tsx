import Link from 'next/link';
import { formatDate, formatReadingTime } from 'utils/formatter';

interface ICardProps {
  id: string;
  title?: string;
  estimatedTime?: number;
  description?: string;
  date?: string;
}

const Card = ({ id, title, estimatedTime, date, description }: ICardProps) => {
  return (
    <div className="my-4 px-4 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
      <div className="h-full w-full shadow-lg px-4 py-4">
        <Link href={`/${id}`}>
          <a>
            <p className="text-blue-500 hover:text-blue-700 text-base sm:text-3xl font-medium truncate overflow-hidden">
              {title}
            </p>
          </a>
        </Link>
        <p className="text-xs font-extralight">{formatDate(date)} • {formatReadingTime(estimatedTime)}</p>
        <div
          className="h-1/2 sm:h-2/3 min-h-1/2 sm:min-h-2/3 py-4"
        >
          <p className="text-sm sm:text-lg overflow-y-hidden break-words font-extralight">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
