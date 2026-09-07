'use client';

import { useMemo } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import useLocaleParams from '@/modules/i18n/hooks/useLocale';
import { getDateText, TimeUnit, DateTimeFormatOptions } from '@/libs/date';

export interface DisplayDateProps extends React.HTMLAttributes<HTMLSpanElement> {
	date: Date | string | number;
	max_ago?: TimeUnit;
	formatOptions?: DateTimeFormatOptions;
}

const DisplayDate = ({
	date,
	max_ago,
	formatOptions,
	className,
	...props
}: DisplayDateProps) => {
	const format = useFormatter();
	const t = useTranslations();
	const { dateLocale } = useLocaleParams();

	const dateObject = useMemo(() => {
		const d = new Date(date);
		return isNaN(d.getTime()) ? new Date() : d;
	}, [date]);

	const dateText = useMemo(() => {
		return getDateText({
			date: dateObject,
			dateLocale,
			max_ago,
			t,
			format,
			formatOptions,
		});
	}, [dateObject, dateLocale, max_ago, t, format, formatOptions]);

	return (
		<span className={className} {...props}>
			{dateText}
		</span>
	);
};

export default DisplayDate;
