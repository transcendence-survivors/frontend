import PlayButton from '@/features/game/components/PlayButton';
import AvatarDropdown from '@/features/user/components/Avatar/AvatarDropDown';
import { cn } from '@/libs/utils';
import I18nLink from '@/modules/i18n/components/I18nLink';
import LocaleDropdownMenu from '@/modules/i18n/components/LocaleDropdownMenu';
import ThemeDropdownMenu from '@/modules/themes/components/ThemeDropdownMenu';
import { useTranslations } from 'next-intl';

type HubFooterProps = React.HTMLAttributes<HTMLElement>;

const HubFooter = ({ className, ...props }: HubFooterProps) => {
	const t = useTranslations('nav');

	return (
		<footer className={cn('px-3 py-3 space-y-2', className)} {...props}>
			<PlayButton className='w-full' hideMobileText={false} />
			<I18nLink
				href='home'
				className={
					'block text-center h-auto w-full text-primary/50 border border-primary/20 rounded-sm px-3 py-2 sm:px-4\
                            font-semibold text-xs sm:text-sm whitespace-nowrap transition-colors\
                            hover:bg-primary/10 hover:text-primary/80 focus-visible:bg-primary/10 focus-visible:text-primary/80 \
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
				}>
				{t('leave_hub')}
			</I18nLink>
			<div className='flex items-center gap-2'>
				<LocaleDropdownMenu className='flex-1' />
				<ThemeDropdownMenu />
			</div>
			<div className='border-t border-sidebar-border pt-5 pb-2 max-w-full w-full'>
				<AvatarDropdown />
			</div>
			<nav className='flex flex-wrap justify-center gap-x-3 gap-y-1'>
				{(['privacy', 'terms'] as const).map((key) => (
					<I18nLink
						key={key}
						href={key}
						className='font-mono text-[9px] uppercase text-muted-foreground hover:text-foreground'>
						{t(key)}
					</I18nLink>
				))}
			</nav>
		</footer>
	);
};

export default HubFooter;
