'use client';

import { formatDate } from '@/libs/date';
import {
	isLast24Hours,
	isLast30Days,
	isLast7Days,
	isThisHour,
	isThisMinute,
} from '@/libs/date/is';
import {
	getDayDifference,
	getHourDifference,
	getMinuteDifference,
	getWeekDifference,
} from '@/libs/date/time-diff';
import useLocaleParams from '@/modules/i18n/hooks/useLocale';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface DateProps extends React.HTMLAttributes<HTMLDivElement> {
	date: Date;
}

const DisplayDate = ({ date, ...props }: DateProps) => {
	const { dateLocale } = useLocaleParams();
	const t = useTranslations('date');

	const dateText = useMemo(() => {
		const now = new Date();

		if (isLast24Hours(now, date)) {
			if (isThisMinute(now, date)) {
				return t('just_now');
			}
			if (isThisHour(now, date)) {
				return t('minutes_ago', { count: getMinuteDifference(now, date) });
			}
			return t('hours_ago', { count: getHourDifference(now, date) });
		}
		if (isLast7Days(now, date)) {
			return t('days_ago', { count: getDayDifference(now, date) });
		}
		if (isLast30Days(now, date)) {
			return t('weeks_ago', { count: getWeekDifference(now, date) });
		}
		return formatDate(date, dateLocale);
	}, [date, dateLocale, t]);

	return <span {...props}>{dateText}</span>;
};

export default DisplayDate;
