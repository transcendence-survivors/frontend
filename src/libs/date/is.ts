import { TIME_UNITS } from './constants';

const isLast24Hours = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return diff < TIME_UNITS.DAY;
};
const isLast7Days = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return diff < TIME_UNITS.WEEK;
};
const isLast30Days = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return diff < TIME_UNITS.MONTH;
};
const isThisHour = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return diff < TIME_UNITS.HOUR;
};
const isThisMinute = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return diff < TIME_UNITS.MINUTE;
};

export { isLast24Hours, isLast7Days, isThisHour, isThisMinute, isLast30Days };
