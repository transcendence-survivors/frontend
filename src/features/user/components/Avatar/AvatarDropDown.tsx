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
import AvatarProfile, { AvatarProfileProps } from './AvatarProfile';
import { NavLink, useRouter } from '@/modules/i18n/utils/navigation';
import { useTranslations } from 'next-intl';
import { SettingsIcon, User } from 'lucide-react';
import LocaleDropdownSubMenu from '@i18n/components/LocaleDropdownSubMenu';
import LogoutDropDownItem from '../../../auth/components/LogoutDropDownItem';
import ThemeDropdownSubMenu from '@themes/components/ThemeDropdownSubMenu';

interface AvatarDropdownProps {
	avatar: AvatarProfileProps;
}

interface DropDownLink extends NavLink {
	icon: React.ReactNode;
}

const links: DropDownLink[] = [
	{ key: 'profile', labelKey: 'profile', icon: <User /> },
	{ key: 'settings', labelKey: 'settings', icon: <SettingsIcon /> },
] as const;

export function AvatarDropdown({ avatar }: AvatarDropdownProps) {
	const t = useTranslations('nav');
	const router = useRouter();

	const redirectTo = (url: string) => {
		router.push(url);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className='rounded-full'>
					<AvatarProfile {...avatar} />
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
				<DropdownMenu>
					<ThemeDropdownSubMenu />
				</DropdownMenu>
				<DropdownMenu>
					<LocaleDropdownSubMenu />
				</DropdownMenu>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<LogoutDropDownItem />
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
