'use client';

import { Button } from '@/components/ui/button';
import { I18nLink } from '@/modules/i18n/components/I18nLink';
import { resolveCanonicalPath, stripLocale } from '@/modules/i18n/middleware';
import { createNavLinks, usePathname } from '@/modules/i18n/utils/navigation';
import { getPath } from '@/modules/i18n/utils/routing';
import { CircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

const links = createNavLinks([
	{ key: 'profile', labelKey: 'profile' },
	{ key: 'feed', labelKey: 'feed' },
	{ key: 'friends', labelKey: 'friends' },
	{ key: 'chat', labelKey: 'chat' },
	{ key: 'search', labelKey: 'search' },
]);

const DashboardNav = ({ ...props }: React.HTMLAttributes<HTMLUListElement>) => {
	const t = useTranslations('nav');
	const path = usePathname();

	const activeKey = useMemo(() => {
		const currentPath = resolveCanonicalPath(stripLocale(path));
		const matchedLink = links.find((link) => getPath(link.key) === currentPath);
		return matchedLink ? matchedLink.key : 'feed';
	}, [path]);

	return (
		<ul {...props}>
			{links.map((l) => (
				<li key={l.key} className=' w-full gap-2'>
					<Button
						asChild
						variant='sidebar'
						size='lg'
						className='w-full gap-3 rounded-none shadow-none py-'
						data-active={activeKey === l.key}>
						<I18nLink href={l.key}>
							<CircleIcon className='size-4 text-primary' />
							{t(l.labelKey)}
						</I18nLink>
					</Button>
				</li>
			))}
		</ul>
	);
};

export default DashboardNav;
