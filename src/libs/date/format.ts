import type { Locale } from 'date-fns';
import { useFormatter } from 'next-intl';
import {
	TIME_UNIT_TRANSLATION_KEYS,
	TIME_UNITS,
	TIME_UNITS_HIERARCHY,
	TimeUnit,
} from './constants';
import { LooseTFunction, RootTFunction } from '@i18n/messages/types';
import { getUnitDifference } from './time-diff';

type Formatter = ReturnType<typeof useFormatter>;

export type DateTimeFormatOptions = Intl.DateTimeFormatOptions;

type GetDateTextParams = {
	date: Date;
	dateLocale: Locale;
	max_ago?: TimeUnit;
	t: RootTFunction;
	format?: Formatter;
	formatOptions?: DateTimeFormatOptions;
};

const defaultFormatOptions: DateTimeFormatOptions = {
	year: 'numeric',
	month: 'short',
	day: 'numeric',
};

export const getDateText = ({
	date,
	dateLocale,
	max_ago,
	t,
	format,
	formatOptions,
}: GetDateTextParams): string => {
	const translate = t as LooseTFunction;
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();

	const options = formatOptions ?? defaultFormatOptions;

	if ((max_ago && diffMs >= TIME_UNITS[max_ago]) || (!max_ago && formatOptions)) {
		if (format) {
			return format.dateTime(date, options as Parameters<Formatter['dateTime']>[1]);
		}
		return date.toLocaleDateString(dateLocale.code, options);
	}

	if (diffMs < TIME_UNITS.MINUTE) {
		return translate(TIME_UNIT_TRANSLATION_KEYS.NOW);
	}

	for (let i = TIME_UNITS_HIERARCHY.length - 1; i >= 0; i--) {
		const { unit, value } = TIME_UNITS_HIERARCHY[i];
		if (diffMs >= value) {
			return translate(TIME_UNIT_TRANSLATION_KEYS[unit], {
				count: getUnitDifference(unit, now, date),
			});
		}
	}

	return translate(TIME_UNIT_TRANSLATION_KEYS.NOW);
};

type DateFormat = {
	intlLocale: Intl.LocalesArgument;
	separator: string;
	order: [number, number, number];
};

export const getDateFormat = (locale: Locale): DateFormat => {
	const intlLocale = locale.code.replace('_', '-');
	const ref = new Date(2013, 10, 5);

	const parts = new Intl.DateTimeFormat(intlLocale, {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	}).formatToParts(ref);

	const separator = parts.find((p) => p.type === 'literal')?.value ?? '/';

	const fieldOrder = parts
		.filter((p) => p.type === 'day' || p.type === 'month' || p.type === 'year')
		.map((p) => p.type as 'day' | 'month' | 'year');

	const dayIndex = fieldOrder.indexOf('day');
	const monthIndex = fieldOrder.indexOf('month');
	const yearIndex = fieldOrder.indexOf('year');

	return {
		intlLocale,
		separator,
		order: [dayIndex, monthIndex, yearIndex],
	};
};

export const parseDateString = (raw: string, format: DateFormat): Date => {
	const parts = raw.split(format.separator);
	const [dayIndex, monthIndex, yearIndex] = format.order;

	const now = new Date();
	const day = Math.min(
		31,
		Math.max(1, parseInt(parts[dayIndex] ?? '') || now.getUTCDate()),
	);
	const month = Math.min(
		12,
		Math.max(1, parseInt(parts[monthIndex] ?? '') || now.getUTCMonth() + 1),
	);
	const year = Math.min(
		9999,
		Math.max(1, parseInt(parts[yearIndex] ?? '') || now.getUTCFullYear()),
	);

	return new Date(Date.UTC(year, month - 1, day));
};
export const toDate = (value: string | Date | undefined): Date | undefined => {
	if (!value) {
		return undefined;
	}
	const d = new Date(value);
	return isNaN(d.getTime()) ? undefined : d;
};
