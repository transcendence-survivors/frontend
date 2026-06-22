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
import { NavLink, useRouter } from '@/modules/i18n/utils/navigation';
import { useTranslations } from 'next-intl';
import { SettingsIcon, User } from 'lucide-react';
import LogoutDropDownItem from '../../../auth/components/LogoutDropDownItem';
import UserIdentity from '../Identity/UserIdentity';

interface AvatarDropdownProps extends React.ComponentProps<typeof UserIdentity> {}

interface DropDownLink extends NavLink {
	icon: React.ReactNode;
}

const links: DropDownLink[] = [
	{ key: 'profile', labelKey: 'profile', icon: <User /> },
	{ key: 'settings', labelKey: 'settings', icon: <SettingsIcon /> },
];

const AvatarDropdown = ({ avatar, user, ...props }: AvatarDropdownProps) => {
	const t = useTranslations('nav');
	const router = useRouter();

	const redirectTo = (url: string) => {
		router.push(url);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={'ghost'} className={`w-full h-auto max-w-full`}>
					<UserIdentity avatar={avatar} user={user} {...props} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					{links.map((link) => (
						<DropdownMenuItem
							key={link.key}
							onClick={() => redirectTo(link.key)}>
							{link.icon}
							{t(link.labelKey)}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<LogoutDropDownItem />
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AvatarDropdown;
