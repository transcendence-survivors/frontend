import Header from '@/components/ui/header';
import I18nLink from '@/modules/i18n/components/I18nLink';

interface SiteHeaderProps {
	active: 'Home' | 'Lore' | 'Support';
}

export default function SiteHeader({ active }: SiteHeaderProps) {
	const navItems: SiteHeaderProps['active'][] = ['Home', 'Lore', 'Support'];

	return (
		<Header
			className={
				'sticky top-0 z-50 px-8 py-5 ' + 'backdrop-blur-md bg-background/70'
			}>
			<div className='flex items-center gap-2'>
				<span
					className={
						'size-2 rounded-full bg-primary ' +
						'shadow-[0_0_12px_var(--primary)]'
					}
				/>
				<span className={'font-bold tracking-[0.3em] ' + 'text-sm uppercase'}>
					Lanternae
				</span>
			</div>
			<div className='flex items-center gap-10'>
				<div className='hidden md:flex items-center gap-8 text-sm'>
					{navItems.map((item) => {
						const className =
							item === active
								? 'text-primary font-medium'
								: 'text-muted-foreground hover:text-foreground';

						if (item === 'Lore' || item === 'Support') {
							return (
								<I18nLink
									key={item}
									href={item === 'Lore' ? 'lore' : 'support'}
									className={className}>
									{item}
								</I18nLink>
							);
						}
						return (
							<span key={item} className={className}>
								{item}
							</span>
						);
					})}
				</div>
				<I18nLink
					href='login'
					className={
						'text-primary font-semibold text-sm ' +
						'border border-primary/40 rounded-sm ' +
						'px-4 py-2'
					}>
					Enter Hub →
				</I18nLink>
			</div>
		</Header>
	);
}
