'use client';

import { Link, usePathname } from '../utils/navigation';
import { LOCALE_LABELS } from '../constants/locales';
import { Button } from '@ui/button';

interface Props extends React.HTMLAttributes<HTMLUListElement> {}

const LocaleSwitcher = ({ ...props }: Props) => {
	const pathname = usePathname();

	return (
		<ul className='flex gap-x-4' {...props}>
			{Object.entries(LOCALE_LABELS).map(([locale, label]) => (
				<li key={locale}>
					<Button asChild>
						<Link href={pathname} locale={locale}>
							{label}
						</Link>
					</Button>
				</li>
			))}
		</ul>
	);
};

export default LocaleSwitcher;
