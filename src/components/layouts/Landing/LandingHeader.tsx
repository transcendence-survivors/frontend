import LogoLink from '@/components/ui/logo-link';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { useTranslations } from 'next-intl';
import LandingNavDrawer from './LandingNavDrawer';
import LandingNav from './LandingNav';
import LocaleDropdownMenu from '@/modules/i18n/components/LocaleDropdownMenu';
import ThemeDropdownMenu from '@/modules/themes/components/ThemeDropdownMenu';

export default function LandingHeader() {
	const t = useTranslations('nav');

	return (
		<header
			className={
				'text-foreground backdrop-blur-md bg-background/70 flex border-b border-border sticky top-0 z-50 px-4 py-5'
			}>
			<div className='flex items-center justify-between gap-2  w-full mx-auto max-w-5xl'>
				<div>
					<LogoLink page='home' />
				</div>
				<div className='flex items-center gap-2 md:gap-4'>
					<LandingNav
						isDrawer={false}
						className='hidden md:flex flex-row items-center gap-4 text-sm'
					/>

					<div className='flex items-center gap-2'>
						<I18nLink
							href='feed'
							className={
								'text-primary border border-primary/40 rounded-sm px-4 py-2 \
                        font-semibold text-xs sm:text-sm whitespace-nowrap transition-colors\
                        hover:bg-primary/10 hover:text-primary focus-visible:bg-primary/10 focus-visible:text-primary \
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
							}>
							{t('enter_hub')}
						</I18nLink>
						<LandingNavDrawer className='md:hidden' />
						<div className='items-center gap-2 hidden md:flex'>
							<LocaleDropdownMenu className='flex-1' showLabel={false} />
							<ThemeDropdownMenu />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
