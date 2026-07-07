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

interface AvatarDropdownProps extends React.ComponentProps<typeof UserIdentity> {}

const links = [
	{
		key: 'userName',
		labelKey: 'profile',
		icon: <User />,
		getHrefParams: (username: string) => ({ username: `@${username}` }),
	},
	{ key: 'settings', labelKey: 'settings', icon: <SettingsIcon /> },
] as const satisfies IconNavLink<AppMessages['nav'], string>[];

const AvatarDropdown = ({ avatar, user, ...props }: AvatarDropdownProps) => {
	const t = useTranslations('nav');

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
						<DropdownMenuItem key={link.key} asChild>
							{'getHrefParams' in link ? (
								<I18nLink
									href={link.key}
									hrefParams={link.getHrefParams(user.username)}>
									{link.icon}
									{t(link.labelKey)}
								</I18nLink>
							) : (
								<I18nLink
									href={link.key}
									className='flex items-center gap-2 w-full'>
									{link.icon}
									{t(link.labelKey)}
								</I18nLink>
							)}
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
