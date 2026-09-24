'use client';

import RoundedLight from '@/components/icons/RoundedLight';
import { Button } from '@/components/ui/button';
import { I18nLink } from '@/modules/i18n/components/I18nLink';
import { NavLink, usePathname } from '@i18n/utils/navigation';
import { getBasePath } from '@/modules/i18n/utils/routing';
import { useTranslations } from 'next-intl';
import { Fragment, useMemo } from 'react';
import { DrawerClose } from '@/components/ui/drawer';
import { AppMessages } from '@/modules/i18n/messages/types';
import { useUser } from '@/features/auth/stores/session';
import { ChatNotifications } from '@/features/chat/components/ChatNotifications';
import { FriendRequestNotifications } from '@/features/relationships/friend-request/components/FriendRequestNotifications';

interface DashboardNavProps extends React.HTMLAttributes<HTMLUListElement> {
	isDrawer?: boolean;
}

const links = [
	{ key: 'feed', labelKey: 'feed' },
	{ key: 'search', labelKey: 'search' },
	{
		key: 'friends',
		labelKey: 'friends',
		additional: <FriendRequestNotifications className='size-5 ml-auto' />,
	},
	{
		key: 'chat',
		labelKey: 'chat',
		additional: <ChatNotifications className='size-5 ml-auto' />,
	},
	{
		key: 'userName',
		labelKey: 'profile',
		getHrefParams: (username) => ({ username: `@${username}` }),
	},
] as const satisfies (NavLink<AppMessages['nav'], string> & {
	additional?: React.ReactNode;
})[];

const DashboardNav = ({ isDrawer, ...props }: DashboardNavProps) => {
	const user = useUser();
	const t = useTranslations('nav');
	const path = usePathname();
	const activeKey = useMemo(() => {
		if (path.startsWith(getBasePath('blocked'))) {
			return 'friends';
		}

		if (path.startsWith(getBasePath('settings'))) {
			return 'userName';
		}

		const userName = user?.username ? `/@${user.username}` : '';
		if (path.startsWith(userName)) {
			return 'userName';
		}

		const matchedLink = links.find((link) => path.startsWith(getBasePath(link.key)));
		return matchedLink ? matchedLink.key : 'search';
	}, [path, user?.username]);

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
							className='w-full gap-3 justify-start font-semibold'
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
									{'additional' in link && link.additional}
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
