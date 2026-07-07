import { TIME_UNITS, TimeUnit } from './constants';

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

const getUnitDifference = (unit: TimeUnit, now: Date, date: Date): number =>
	Math.floor((now.getTime() - date.getTime()) / TIME_UNITS[unit]);

export {
	getMinuteDifference,
	getHourDifference,
	getDayDifference,
	getWeekDifference,
	getMonthDifference,
	getYearDifference,
	getUnitDifference,
};
