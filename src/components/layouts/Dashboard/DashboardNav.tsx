'use client';

import RoundedLight from '@/components/icons/RoundedLight';
import { Button } from '@/components/ui/button';
import { I18nLink } from '@/modules/i18n/components/I18nLink';
import { NavLink, usePathname } from '@i18n/utils/navigation';
import { getPath } from '@/modules/i18n/utils/routing';
import { useTranslations } from 'next-intl';
import { Fragment, useMemo } from 'react';
import { DrawerClose } from '@/components/ui/drawer';
import { AppMessages } from '@/modules/i18n/messages/types';
import { useUser } from '@/features/auth/stores/session';

interface DashboardNavProps extends React.HTMLAttributes<HTMLUListElement> {
	isDrawer?: boolean;
}

const links = [
	{ key: 'feed', labelKey: 'feed' },
	{ key: 'search', labelKey: 'search' },
	{ key: 'friends', labelKey: 'friends' },
	{ key: 'chat', labelKey: 'chat' },
	{
		key: 'userName',
		labelKey: 'profile',
		getHrefParams: (username) => ({ username: `@${username}` }),
	},
] as const satisfies NavLink<AppMessages['nav'], string>[];

const DashboardNav = ({ isDrawer, ...props }: DashboardNavProps) => {
	const user = useUser();
	const t = useTranslations('nav');
	const path = usePathname();
	const activeKey = useMemo(() => {
		const matchedLink = links.find((link) => path.startsWith(getPath(link.key)));
		return matchedLink ? matchedLink.key : 'search';
	}, [path]);

	const { Tag, tagProps } = useMemo(() => {
		return {
			Tag: isDrawer ? DrawerClose : Fragment,
			tagProps: isDrawer ? { asChild: true } : {},
		};
	}, [isDrawer]);

	return (
		<ul {...props}>
			{links.map((link) => (
				<li key={link.key}>
					<Tag {...tagProps}>
						<Button
							asChild
							variant='sidebar'
							size='sidebar'
							className='w-full gap-3 justify-start'
							data-active={activeKey === link.key}>
							{'getHrefParams' in link ? (
								<I18nLink
									href={link.key}
									hrefParams={link.getHrefParams(user?.username ?? '')}>
									<RoundedLight
										size='xs'
										data-active={activeKey === link.key}
									/>
									{t(link.labelKey)}
								</I18nLink>
							) : (
								<I18nLink href={link.key}>
									<RoundedLight
										size='xs'
										data-active={activeKey === link.key}
									/>
									{t(link.labelKey)}
								</I18nLink>
							)}
						</Button>
					</Tag>
				</li>
			))}
		</ul>
	);
};

export default DashboardNav;
