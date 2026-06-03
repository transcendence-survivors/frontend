import {
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { capitalize } from '@/libs/utils';
import { Theme } from '@/modules/themes/constants/themes';
import useTypedTheme from '@/modules/themes/hooks/useTypedTheme';
import { PaletteIcon } from 'lucide-react';

const ThemeDropdownSubMenu = () => {
	const { current, setTheme, themes, themeIcons } = useTypedTheme();

	const renderIcon = (theme: Theme) => {
		const Icon = themeIcons[theme];
		return <Icon />;
	};

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger>
				<PaletteIcon />
				Theme
			</DropdownMenuSubTrigger>
			<DropdownMenuPortal>
				<DropdownMenuSubContent>
					<DropdownMenuGroup>
						<DropdownMenuLabel>Appearance</DropdownMenuLabel>
						<DropdownMenuRadioGroup value={current} onValueChange={setTheme}>
							{themes.map((theme) => (
								<DropdownMenuRadioItem key={theme} value={theme}>
									{renderIcon(theme)}
									{capitalize(theme)}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuGroup>
				</DropdownMenuSubContent>
			</DropdownMenuPortal>
		</DropdownMenuSub>
	);
};

export default ThemeDropdownSubMenu;
