'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AvatarProfile, { AvatarProfileProps } from './AvatarProfile';
import { NavLink, useRouter } from '@/modules/i18n/utils/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Spinner } from '@/components/ui/spinner';
import useLogOut from '@/features/auth/hooks/useLogOut';
import { MonitorIcon, MoonIcon, PaletteIcon, SunIcon, SettingsIcon } from 'lucide-react';
import useTypedTheme from '@/modules/themes/hooks/useTypedTheme';
import { THEMES } from '@/modules/themes/constants/themes';
import useLocaleParams from '@/modules/i18n/hooks/useLocale';

interface AvatarDropdownProps {
	avatar: AvatarProfileProps;
}

interface DropDownLink extends NavLink {
	icon: React.ReactNode;
}

const links: DropDownLink[] = [
	{ key: 'profile', labelKey: 'profile', icon: <SettingsIcon /> },
	{ key: 'settings', labelKey: 'settings', icon: <SettingsIcon /> },
];

export function AvatarDropdown({ avatar }: AvatarDropdownProps) {
	const { theme, setTheme } = useTypedTheme();
	const { localesIcon, locales, setLocale, currentLocale } = useLocaleParams();
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
							{link.icon}
							{t(link.labelKey)}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenu>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<PaletteIcon />
							Theme
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuGroup>
									<DropdownMenuLabel>Appearance</DropdownMenuLabel>
									<DropdownMenuRadioGroup
										value={theme}
										onValueChange={setTheme}>
										{THEMES.map((themeOption) => (
											<DropdownMenuRadioItem
												key={themeOption}
												value={themeOption}>
												{themeOption === 'light' && <SunIcon />}
												{themeOption === 'dark' && <MoonIcon />}
												{themeOption === 'system' && (
													<MonitorIcon />
												)}
												{themeOption.charAt(0).toUpperCase() +
													themeOption.slice(1)}
											</DropdownMenuRadioItem>
										))}
									</DropdownMenuRadioGroup>
								</DropdownMenuGroup>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenu>
				<DropdownMenu>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<PaletteIcon />
							Theme
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuGroup>
									<DropdownMenuLabel>Appearance</DropdownMenuLabel>
									<DropdownMenuRadioGroup
										value={currentLocale}
										onValueChange={setLocale}>
										{locales.map((locale) => (
											<DropdownMenuRadioItem
												key={locale}
												value={locale}>
												{localesIcon[locale]}
												{locale.charAt(0).toUpperCase() +
													locale.slice(1)}
											</DropdownMenuRadioItem>
										))}
									</DropdownMenuRadioGroup>
								</DropdownMenuGroup>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenu>
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
