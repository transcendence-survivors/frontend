import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { createDropDownLinks } from '@/modules/i18n/utils/navigation';
import { useTranslations } from 'next-intl';
import { SettingsIcon, User } from 'lucide-react';
import LogoutDropDownItem from '../../../auth/components/LogoutDropDownItem';
import { UserIdentity } from '../Identity/UserIdentity';
import I18nLink from '@/modules/i18n/components/I18nLink';

interface AvatarDropdownProps extends React.ComponentProps<typeof UserIdentity> {}

const links = createDropDownLinks([
	{ key: 'profile', labelKey: 'profile', icon: <User /> },
	{ key: 'settings', labelKey: 'settings', icon: <SettingsIcon /> },
]);

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
							<I18nLink
								href={link.key}
								className='flex items-center gap-2 w-full'>
								{link.icon}
								{t(link.labelKey)}
							</I18nLink>
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
