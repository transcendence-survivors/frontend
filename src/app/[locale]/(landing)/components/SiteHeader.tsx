import Header from '@/components/ui/header';
import LogoLink from '@/components/ui/logo-link';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { AppMessages } from '@/modules/i18n/messages/types';
import { NavLink } from '@/modules/i18n/utils/navigation';
import { useTranslations } from 'next-intl';

interface SiteHeaderProps {
	active: KeyNavItem;
}

const navItems = [
	{ key: 'home', labelKey: 'home' },
	{ key: 'lore', labelKey: 'lore' },
	{ key: 'support', labelKey: 'support' },
] as const satisfies NavLink<AppMessages['nav']>[];

type KeyNavItem = (typeof navItems)[number]['key'];

export default function SiteHeader({ active }: SiteHeaderProps) {
	const t = useTranslations('nav');

	return (
		<Header
			className={
				'sticky top-0 z-50 px-8 py-5 ' + 'backdrop-blur-md bg-background/70'
			}>
			<LogoLink page='home' />
			<div className='flex items-center gap-10'>
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
						'text-primary font-semibold text-sm border border-primary/40 rounded-sm px-4 py-2'
					}>
					{t('enter_hub')}
				</I18nLink>
			</div>
		</Header>
	);
}
