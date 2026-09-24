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
import { capitalize } from '@/libs/utils';
import { Theme } from '@/modules/themes/constants/themes';
import useTypedTheme from '@/modules/themes/hooks/useTypedTheme';
import { PaletteIcon } from 'lucide-react';
import { useIsMounted } from '@/hooks/useIsMounted';

const ThemeDropdownMenu = () => {
	const isMounted = useIsMounted();
	const { current, setTheme, themes, themeIcons } = useTypedTheme();

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
					<DropdownMenuLabel>Apparence</DropdownMenuLabel>
					<DropdownMenuRadioGroup
						value={current}
						onValueChange={(val) => setTheme(val as Theme)}>
						{themes.map((theme) => (
							<DropdownMenuRadioItem
								key={theme}
								value={theme}
								className='gap-2'>
								{renderIcon(theme)}
								<span>{capitalize(theme)}</span>
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ThemeDropdownMenu;
