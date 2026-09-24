'use client';

import { cn } from '@/libs/utils';
import { AppMessages } from '@/modules/i18n/messages/types';
import { useUserSettingsSidebar } from './UserSettingsSidebarProvider';
import { NavLink, usePathname } from '@/modules/i18n/utils/navigation';
import { Button } from '@/components/ui/button';
import I18nLink from '@/modules/i18n/components/I18nLink';
import RoundedLight from '@/components/icons/RoundedLight';
import { useTranslations } from 'next-intl';
import UserSettingsSidebarTrigger from './UserSettingsSidebarTrigger';
import { useMemo } from 'react';
import { getBasePath } from '@/modules/i18n/utils/routing';

type UserSettingsSidebarProps = React.HTMLAttributes<HTMLElement>;

const links = [
	{ key: 'settingsAccount', labelKey: 'nav.account' },
	{ key: 'settingsProfile', labelKey: 'nav.profile' },
	{ key: 'settingsSecurity', labelKey: 'nav.security' },
	{ key: 'settingsDangerZone', labelKey: 'nav.danger_zone' },
] as const satisfies NavLink<AppMessages['settings']>[];

const UserSettingsSidebar = ({ className, ...props }: UserSettingsSidebarProps) => {
	const t = useTranslations('settings');
	const { isOpen } = useUserSettingsSidebar();

	const path = usePathname();
	const activeKey = useMemo(() => {
		const matchedLink = links.find((link) => path.startsWith(getBasePath(link.key)));
		return matchedLink ? matchedLink.key : undefined;
	}, [path]);

	return (
		<aside
			className={cn(
				'flex flex-col bg-card h-full transition-all min-h-0 absolute inset-0 z-20 w-full min-w-full lg:static overflow-hidden',
				isOpen
					? 'translate-x-0 md:w-80 md:min-w-80 opacity-100 border-r border-border'
					: '-translate-x-full md:translate-x-0 md:w-0 md:min-w-0 opacity-0 border-none',
				className,
			)}
			{...props}>
			<nav>
				<div className='px-4 py-5 space-y-2 border-b border-border'>
					<div className='flex items-center justify-between gap-2'>
						<h2 className='font-display text-xl font-bold'>{t('title')}</h2>
						<div className='lg:hidden'>
							<UserSettingsSidebarTrigger />
						</div>
					</div>
				</div>
				<ul>
					{links.map((link) => (
						<li key={link.key}>
							<Button
								asChild
								variant='sidebar'
								size='sidebar'
								className='w-full gap-3 justify-start font-semibold'
								data-active={activeKey === link.key}>
								<I18nLink href={link.key}>
									<RoundedLight
										size='xs'
										data-active={activeKey === link.key}
									/>
									{t(link.labelKey)}
								</I18nLink>
							</Button>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};

export default UserSettingsSidebar;
