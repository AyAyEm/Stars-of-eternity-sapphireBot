import dayjsSource from 'dayjs';
import TimezonePlugin from 'dayjs/plugin/timezone';
import UtcPlugin from 'dayjs/plugin/utc';

dayjsSource.extend(UtcPlugin);
dayjsSource.extend(TimezonePlugin);

export const dayjs = dayjsSource;
export default dayjs;
