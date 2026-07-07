import { MessageKeys } from '@/modules/i18n/messages/types';

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

type TimeUnit = keyof typeof TIME_UNITS;

const TIME_UNITS_HIERARCHY = [
	{ unit: 'MINUTE', value: minute },
	{ unit: 'HOUR', value: hour },
	{ unit: 'DAY', value: day },
	{ unit: 'WEEK', value: week },
	{ unit: 'MONTH', value: month },
	{ unit: 'YEAR', value: year },
] as const satisfies readonly { unit: TimeUnit; value: number }[];

const TIME_UNIT_TRANSLATION_KEYS = {
	MINUTE: 'date.minutes_ago',
	HOUR: 'date.hours_ago',
	DAY: 'date.days_ago',
	WEEK: 'date.weeks_ago',
	MONTH: 'date.months_ago',
	YEAR: 'date.years_ago',
	NOW: 'date.just_now',
} as const satisfies Record<TimeUnit | 'NOW', MessageKeys>;

export { TIME_UNITS, TIME_UNITS_HIERARCHY, TIME_UNIT_TRANSLATION_KEYS };
export type { TimeUnit };
