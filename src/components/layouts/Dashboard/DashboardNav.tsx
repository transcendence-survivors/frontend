'use client';

import RoundedLight from '@/components/icons/RoundedLight';
import { Button } from '@/components/ui/button';
import { I18nLink } from '@/modules/i18n/components/I18nLink';
import { createNavLinks, usePathname } from '@i18n/utils/navigation';
import { getPath } from '@/modules/i18n/utils/routing';
import { useTranslations } from 'next-intl';
import { Fragment, useMemo } from 'react';
import { DrawerClose } from '@/components/ui/drawer';

interface DashboardNavProps extends React.HTMLAttributes<HTMLUListElement> {
	isDrawer?: boolean;
}

const links = createNavLinks([
	{ key: 'feed', labelKey: 'feed' },
	{ key: 'search', labelKey: 'search' },
	{ key: 'friends', labelKey: 'friends' },
	{ key: 'chat', labelKey: 'chat' },
	{ key: 'profile', labelKey: 'profile' },
]);

const DashboardNav = ({ isDrawer, ...props }: DashboardNavProps) => {
	const t = useTranslations('nav');
	const path = usePathname();
	const activeKey = useMemo(() => {
		const matchedLink = links.find((link) => path.startsWith(getPath(link.key)));
		return matchedLink ? matchedLink.key : 'feed';
	}, [path]);

	const { Tag, tagProps } = useMemo(() => {
		return {
			Tag: isDrawer ? DrawerClose : Fragment,
			tagProps: isDrawer ? { asChild: true } : {},
		};
	}, [isDrawer]);

	return (
		<ul {...props}>
			{links.map((l) => (
				<li key={l.key}>
					<Tag {...tagProps}>
						<Button
							asChild
							variant='sidebar'
							size='sidebar'
							className='w-full gap-3 justify-start'
							data-active={activeKey === l.key}>
							<I18nLink href={l.key}>
								<RoundedLight
									size='xs'
									data-active={activeKey === l.key}
								/>
								{t(l.labelKey)}
							</I18nLink>
						</Button>
					</Tag>
				</li>
			))}
		</ul>
	);
};

export default DashboardNav;
