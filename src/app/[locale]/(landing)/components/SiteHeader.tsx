import Header from '@/components/ui/header';
import LogoLink from '@/components/ui/logo-link';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { useTranslations } from 'next-intl';
import { KeyNavItem, navItems } from './navItems';
import SiteNavDrawer from './SiteNavDrawer';

interface SiteHeaderProps {
	active: KeyNavItem;
}

export default function SiteHeader({ active }: SiteHeaderProps) {
	const t = useTranslations('nav');

	return (
		<Header
			className={
				'sticky top-0 z-50 px-4 py-2 sm:px-8 sm:py-5 gap-2 ' +
				'backdrop-blur-md bg-background/70'
			}>
			<LogoLink page='home' />
			<div className='flex items-center gap-2 md:gap-10'>
				<div className='hidden md:flex items-center gap-8 text-sm'>
					{navItems.map(({ key, labelKey }) => (
						<I18nLink
							key={key}
							href={key}
							className={
								key === active
									? 'text-primary font-medium'
									: 'text-muted-foreground hover:text-foreground'
							}>
							{t(labelKey)}
						</I18nLink>
					))}
				</div>
				<I18nLink
					href='feed'
					className={
						'text-primary font-semibold text-xs sm:text-sm border border-primary/40 rounded-sm px-3 py-2 sm:px-4 whitespace-nowrap'
					}>
					{t('enter_hub')}
				</I18nLink>
				<SiteNavDrawer active={active} />
			</div>
		</Header>
	);
}
