import SiteHeader from '../components/SiteHeader';
import CategoryGrid from './components/CategoryGrid';
import FaqAccordion from './components/FaqAccordion';

export default function SupportPage() {
	return (
		<main>
			<SiteHeader active='Support' />
			<div className='max-w-4xl mx-auto px-4 py-20'>
				<div className='text-center mb-16'>
					<p className='text-sm tracking-[0.3em] text-primary mb-6 uppercase font-mono'>
						Help Center
					</p>
					<h1 className='heading-1 text-foreground'>
						Comment garder ta lumière allumée ?
					</h1>
				</div>
				<CategoryGrid />
				<FaqAccordion />
			</div>
		</main>
	);
}
