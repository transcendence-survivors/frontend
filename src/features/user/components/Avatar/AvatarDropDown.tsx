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
import { Spinner } from '@/components/ui/spinner';
import useLogOut from '@/features/auth/hooks/useLogOut';

interface AvatarDropdownProps {
	avatar: AvatarProfileProps;
}

const links: NavLink[] = [
	{ key: 'profile', labelKey: 'profile' },
	{ key: 'settings', labelKey: 'settings' },
];

export function AvatarDropdown({ avatar }: AvatarDropdownProps) {
	const t = useTranslations('nav');
	const router = useRouter();

	const { isPending, mutate } = useLogOut(router);

	const handleLogout = async () => {
		mutate();
	};

	const redirectTo = (url: string) => {
		router.push(url);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant='ghost' size='icon' className='rounded-full'>
						<AvatarProfile {...avatar} />
					</Button>
				}
			/>
			<DropdownMenuContent className='w-32'>
				<DropdownMenuGroup>
					{links.map((link) => (
						<DropdownMenuItem
							key={link.key}
							onClick={() => redirectTo(link.key)}>
							{t(link.labelKey)}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						variant='destructive'
						onClick={handleLogout}
						disabled={isPending}>
						{isPending ? <Spinner /> : t('logout')}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
