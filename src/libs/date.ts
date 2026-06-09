import type { Locale } from 'date-fns';

type DateFormat = {
	intlLocale: string;
	separator: string;
	order: [number, number, number]; // [dayIndex, monthIndex, yearIndex]
};

export function getDateFormat(locale: Locale): DateFormat {
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
}

export function parseDateString(raw: string, format: DateFormat): Date {
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
}

export function toDate(value: string | Date | undefined): Date | undefined {
	if (!value) {
		return undefined;
	}
	const d = new Date(value);
	return isNaN(d.getTime()) ? undefined : d;
}

export function isOlderThan(date: Date, age: number): boolean {
	const today = new Date();
	const ageDate = new Date(
		today.getFullYear() - age,
		today.getMonth(),
		today.getDate(),
	);
	return date <= ageDate;
}

export function isYoungerThan(date: Date, age: number): boolean {
	const today = new Date();
	const ageDate = new Date(
		today.getFullYear() - age,
		today.getMonth(),
		today.getDate(),
	);
	return date > ageDate;
}

export function isOlderThan13(date: Date): boolean {
	return isOlderThan(date, 13);
}
