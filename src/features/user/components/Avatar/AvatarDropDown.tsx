'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconNavLink } from '@/modules/i18n/utils/navigation';
import { useTranslations } from 'next-intl';
import { SettingsIcon, User } from 'lucide-react';
import LogoutDropDownItem from '../../../auth/components/LogoutDropDownItem';
import { UserIdentity } from '../Identity/UserIdentity';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { AppMessages } from '@/modules/i18n/messages/types';
import { useUser } from '@/features/auth/stores/session';
import PresenceDropDownSubMenu from '@/features/presence/components/PresenceDropDownSubMenu';
import { usePresenceStatus } from '@/features/presence/hooks/usePresenceState';

const links = [
	{
		key: 'userName',
		labelKey: 'profile',
		icon: <User />,
		getHrefParams: (username: string) => ({ username: `@${username}` }),
	},
	{ key: 'settings', labelKey: 'settings', icon: <SettingsIcon /> },
] as const satisfies IconNavLink<AppMessages['nav'], string>[];

const AvatarDropdown = ({}) => {
	const t = useTranslations('nav');
	const user = useUser();
	const status = usePresenceStatus();

	if (!user) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={'ghost'} className={`w-full h-auto max-w-full`}>
					<UserIdentity
						className='py-2'
						avatar={{
							img: {
								src: user.avatarUrl ?? '',
								alt: `${user.displayName}'s avatar`,
							},
							badgeState: status.status,
						}}
						user={{
							username: user.username,
							displayName: user.displayName,
						}}
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='bg-background' sideOffset={8}>
				<DropdownMenuGroup className=' bg-card'>
					{links.map((link) => (
						<DropdownMenuItem
							key={link.key}
							asChild
							className='flex w-full items-center py-2 cursor-pointer font-medium'>
							{'getHrefParams' in link ? (
								<I18nLink
									href={link.key}
									hrefParams={link.getHrefParams(user.username)}>
									{link.icon}
									{t(link.labelKey)}
								</I18nLink>
							) : (
								<I18nLink href={link.key}>
									{link.icon}
									{t(link.labelKey)}
								</I18nLink>
							)}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className='bg-card '>
					<PresenceDropDownSubMenu />
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className='bg-card '>
					<LogoutDropDownItem />
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AvatarDropdown;
