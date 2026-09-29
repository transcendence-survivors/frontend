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
import useLocaleParams from '@/modules/i18n/hooks/useLocale';
import { Locale } from '../constants/locales';
import { cn } from '@/libs/utils';

type LocaleDropdownMenuProps = React.ComponentProps<typeof Button> & {
	showLabel?: boolean;
};

const LocaleDropdownMenu = ({
	className,
	showLabel = true,
	...props
}: LocaleDropdownMenuProps) => {
	const { localesIcon, locales, localeLabels, setLocale, currentLocale } =
		useLocaleParams();

	const onValueChange = (value: string) => {
		setLocale(value as Locale);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					className={cn('justify-start', className)}
					{...props}>
					{localesIcon[currentLocale]}
					{showLabel && (
						<span className='ml-2 capitalize'>
							{localeLabels[currentLocale]}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				sideOffset={4}
				className={showLabel ? 'w-56' : 'w-16 min-w-0'}>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Langue</DropdownMenuLabel>
					<DropdownMenuRadioGroup
						value={currentLocale}
						onValueChange={onValueChange}>
						{locales.map((locale) => (
							<DropdownMenuRadioItem key={locale} value={locale}>
								{localesIcon[locale]}
								{showLabel && (
									<span className='ml-2 capitalize'>
										{localeLabels[locale]}
									</span>
								)}
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LocaleDropdownMenu;
