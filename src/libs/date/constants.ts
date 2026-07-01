const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = day * 365;

const TIME_UNITS = {
	MINUTE: minute,
	HOUR: hour,
	DAY: day,
	WEEK: week,
	MONTH: month,
	YEAR: year,
} as const;

export { TIME_UNITS };
