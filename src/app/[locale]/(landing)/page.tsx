import Header from '@/components/ui/header';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import SiteFooter from './components/SiteFooter';
import I18nLink from '@/modules/i18n/components/I18nLink';

export default function Page() {
	return (
		<main>
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
						<span className='text-primary font-medium'>Home</span>
						<span className='text-muted-foreground'>Lore</span>
						<span className='text-muted-foreground'>Support</span>
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

			<div className='max-w-5xl w-full mx-auto py-20 px-4'>
				<HeroSection />
				<FeatureSection />
			</div>
			<SiteFooter />
		</main>
	);
}
