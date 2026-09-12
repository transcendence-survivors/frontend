import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';

export default function Page() {
	return (
		<main>
			<SiteHeader active='Home' />

			<div className='max-w-5xl w-full mx-auto py-20 px-4'>
				<HeroSection />
				<FeatureSection />
			</div>
			<SiteFooter />
		</main>
	);
}
