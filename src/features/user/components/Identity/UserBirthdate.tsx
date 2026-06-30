'use client';

import { formatDate } from '@/libs/date';
import { cn } from '@/libs/utils';
import useLocaleParams from '@/modules/i18n/hooks/useLocale';
import { Balloon } from 'lucide-react';

interface UserBirthdateProps extends React.HTMLAttributes<HTMLSpanElement> {
	birthdate: Date;
}

const UserBirthdate = ({ birthdate, className, ...props }: UserBirthdateProps) => {
	const { dateLocale } = useLocaleParams();
	return (
		<div className={cn('flex items-center gap-x-1', className)} {...props}>
			<Balloon className='text-inherit size-5' />
			<span>{formatDate(birthdate, dateLocale)}</span>
		</div>
	);
};

export default UserBirthdate;
