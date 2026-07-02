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

const isOlderThan = (date: Date, age: number) => {
	const today = new Date();
	const ageDate = new Date(
		today.getFullYear() - age,
		today.getMonth(),
		today.getDate(),
	);
	return date <= ageDate;
};

const isYoungerThan = (date: Date, age: number) => {
	const today = new Date();
	const ageDate = new Date(
		today.getFullYear() - age,
		today.getMonth(),
		today.getDate(),
	);
	return date > ageDate;
};

const isOlderThan13 = (date: Date) => {
	return isOlderThan(date, 13);
};

export {
	isLast24Hours,
	isLast7Days,
	isThisHour,
	isThisMinute,
	isLast30Days,
	isOlderThan,
	isYoungerThan,
	isOlderThan13,
};
