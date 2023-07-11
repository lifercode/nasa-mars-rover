import _dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';

import { DayjsPlugin } from '../types';

const dayjs: DayjsPlugin = _dayjs.extend(dayjsRandom);

export default function getRandomDate(start: string, end: string) {
  return dayjs.between && dayjs.between(start, end).format('YYYY-MM-DD');
}
