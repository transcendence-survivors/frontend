import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import LogoLink from '@/components/ui/logo-link';
import LandingNav from './LandingNav';
import LocaleDropdownMenu from '@/modules/i18n/components/LocaleDropdownMenu';
import ThemeDropdownMenu from '@/modules/themes/components/ThemeDropdownMenu';
import I18nLink from '@/modules/i18n/components/I18nLink';

type LandingNavDrawerProps = React.ComponentProps<typeof Button>;

export default function LandingNavDrawer({ ...props }: LandingNavDrawerProps) {
	const t = useTranslations('nav');

	return (
		<Drawer direction='left'>
			<DrawerTrigger asChild>
				<Button variant='ghost' size='icon' aria-label={t('menu')} {...props}>
					<Menu />
				</Button>
			</DrawerTrigger>

			<DrawerContent className='bg-sidebar text-sidebar-foreground max-w-[250px]! '>
				<DrawerHeader className='border-b border-sidebar-border'>
					<DrawerTitle className='text-lg font-semibold'>
						<LogoLink page='home' className='py-6' />
					</DrawerTitle>
				</DrawerHeader>
				<div className='no-scrollbar overflow-y-auto'>
					<LandingNav isDrawer={true} className='w-full pt-3' />
				</div>
				<DrawerFooter className='p-3'>
					<I18nLink
						href='feed'
						className={
							'text-center text-primary border border-primary/40 rounded-sm px-4 py-2 \
                            font-semibold text-xs sm:text-sm whitespace-nowrap transition-colors\
                            hover:bg-primary/10 hover:text-primary focus-visible:bg-primary/10 focus-visible:text-primary \
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
						}>
						{t('enter_hub')}
					</I18nLink>
					<div className='flex items-center gap-2'>
						<LocaleDropdownMenu className='flex-1' />
						<ThemeDropdownMenu />
					</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
