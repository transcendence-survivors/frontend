import I18nLink from '@/components/customs/I18nLink';
import { Locale, RouteKey } from '@/i18n/routing';
import { Button } from '../ui/button';
import Link from 'next/link';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
	path: RouteKey;
}

type LinkMap = Record<Locale, string>;
const linkMap: LinkMap = {
	en: 'English',
	de: 'Deutsch',
	fr: 'Français',
};

const LocaleSwitcher = ({ path, ...props }: Props) => {
	return (
		<ul className='flex gap-x-4' {...props}>
			{Object.entries(linkMap).map(([locale, label]) => (
				<li key={locale}>
					<Button asChild>
						<I18nLink
							href={path}
							locale={locale as Locale}
							className='text-sm font-medium text-gray-500 hover:text-gray-700'>
							{label}
						</I18nLink>{' '}
					</Button>
				</li>
			))}
		</ul>
	);
};

export default LocaleSwitcher;
