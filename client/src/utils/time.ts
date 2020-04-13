import moment from 'moment';

const fromNow = (timestamp: number): string => {
  const date = moment(timestamp);
  date.locale('ja');
  return date.fromNow();
};

export { fromNow };
