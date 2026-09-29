'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Theme } from '@/modules/themes/constants/themes';
import useTypedTheme from '@/modules/themes/hooks/useTypedTheme';
import { PaletteIcon } from 'lucide-react';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useTranslations } from 'next-intl';

const ThemeDropdownMenu = () => {
	const isMounted = useIsMounted();
	const { current, setTheme, themes, themeIcons } = useTypedTheme();
	const t = useTranslations('common');

	const renderIcon = (theme: Theme) => {
		const Icon = themeIcons[theme];
		return <Icon />;
	};

	const CurrentThemeIcon =
		isMounted && current ? (themeIcons[current] ?? PaletteIcon) : PaletteIcon;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<CurrentThemeIcon className='size-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' sideOffset={4} className='w-56'>
				<DropdownMenuGroup>
					<DropdownMenuLabel>{t('appearance')}</DropdownMenuLabel>
					<DropdownMenuRadioGroup
						value={current}
						onValueChange={(val) => setTheme(val as Theme)}>
						{themes.map((theme) => (
							<DropdownMenuRadioItem
								key={theme}
								value={theme}
								className='gap-2'>
								{renderIcon(theme)}
								<span>{t(`themes.${theme}`)}</span>
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ThemeDropdownMenu;
