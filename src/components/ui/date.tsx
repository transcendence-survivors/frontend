'use client';

import { getDateText, TimeUnit } from '@/libs/date';

import useLocaleParams from '@/modules/i18n/hooks/useLocale';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface DateProps extends React.HTMLAttributes<HTMLDivElement> {
	date: Date;
	max_ago?: TimeUnit;
}

const DisplayDate = ({ date, max_ago, ...props }: DateProps) => {
	const { dateLocale } = useLocaleParams();
	const t = useTranslations();

	const dateText = useMemo(
		() => getDateText({ date, dateLocale, max_ago, t }),
		[date, dateLocale, max_ago, t],
	);

	return <span {...props}>{dateText}</span>;
};

export default DisplayDate;
