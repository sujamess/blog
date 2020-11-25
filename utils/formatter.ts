import dayjs from 'dayjs';

const DEFAULT_DATE_FORMAT = 'MMMM DD, YYYY';

export const formatDate = (date: string): string => {
  return dayjs(date).format(DEFAULT_DATE_FORMAT);
};

export const formatReadingTime = (time: number): string => {
  const minuteUnit: string = time > 1 ? 'minutes' : 'minute';

  return `${time} ${minuteUnit} read`
};
