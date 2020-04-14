import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ja';

dayjs.locale('ja');
dayjs.extend(relativeTime);

const fromNow = (timestamp: number): string => {
  const date = dayjs.unix(timestamp);
  return date.fromNow();
};

export { fromNow };
