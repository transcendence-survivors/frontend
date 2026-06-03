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
import useLocaleParams from '@/modules/i18n/hooks/useLocale';
import { PaletteIcon } from 'lucide-react';

const LocaleDropdownSubMenu = () => {
	const { localesIcon, locales, setLocale, currentLocale } = useLocaleParams();

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger>
				<PaletteIcon />
				Locale
			</DropdownMenuSubTrigger>
			<DropdownMenuPortal>
				<DropdownMenuSubContent>
					<DropdownMenuGroup>
						<DropdownMenuLabel>Locale</DropdownMenuLabel>
						<DropdownMenuRadioGroup
							value={currentLocale}
							onValueChange={setLocale}>
							{locales.map((locale) => (
								<DropdownMenuRadioItem key={locale} value={locale}>
									{localesIcon[locale]}
									{locale.charAt(0).toUpperCase() + locale.slice(1)}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuGroup>
				</DropdownMenuSubContent>
			</DropdownMenuPortal>
		</DropdownMenuSub>
	);
};

export default LocaleDropdownSubMenu;
