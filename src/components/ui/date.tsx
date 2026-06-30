'use client';

import { formatDate } from '@/libs/date';
import useLocaleParams from '@/modules/i18n/hooks/useLocale';

interface DateProps extends React.HTMLAttributes<HTMLDivElement> {
	date: Date;
}

const TIME_UNITS = {
	MINUTE: 1000 * 60,
	HOUR: 1000 * 60 * 60,
	DAY: 1000 * 60 * 60 * 24,
	WEEK: 1000 * 60 * 60 * 24 * 7,
	MONTH: 1000 * 60 * 60 * 24 * 30,
	YEAR: 1000 * 60 * 60 * 24 * 365,
} as const;

const isLast24Hours = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return diff < TIME_UNITS.DAY;
};
const isLast7Days = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return diff < TIME_UNITS.WEEK;
};
const isThisHour = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return diff < TIME_UNITS.HOUR;
};

const getMinuteDifference = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return Math.floor(diff / TIME_UNITS.MINUTE);
};
const getHourDifference = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return Math.floor(diff / TIME_UNITS.HOUR);
};

const DisplayDate = ({ date, ...props }: DateProps) => {
	const { dateLocale } = useLocaleParams();
	const now = new Date();

	if (isLast24Hours(now, date)) {
		if (isThisHour(now, date)) {
			return <span {...props}>{getMinuteDifference(now, date)} min ago</span>;
		}
		return <span {...props}>{getHourDifference(now, date)} hours ago</span>;
	}
	if (isLast7Days(now, date)) {
		return <span {...props}>{formatDate(date, dateLocale)}</span>;
	}
	return <span {...props}>{formatDate(date, dateLocale)}</span>;
};

export default DisplayDate;
