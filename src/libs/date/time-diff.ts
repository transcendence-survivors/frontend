import { TIME_UNITS } from './constants';

const getMinuteDifference = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return Math.floor(diff / TIME_UNITS.MINUTE);
};
const getHourDifference = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return Math.floor(diff / TIME_UNITS.HOUR);
};
const getDayDifference = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return Math.floor(diff / TIME_UNITS.DAY);
};
const getWeekDifference = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return Math.floor(diff / TIME_UNITS.WEEK);
};
const getMonthDifference = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return Math.floor(diff / TIME_UNITS.MONTH);
};
const getYearDifference = (now: Date, date: Date) => {
	const diff = now.getTime() - date.getTime();
	return Math.floor(diff / TIME_UNITS.YEAR);
};

export {
	getMinuteDifference,
	getHourDifference,
	getDayDifference,
	getWeekDifference,
	getMonthDifference,
	getYearDifference,
};
