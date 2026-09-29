import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';

export default function Page() {
	return (
		<div className='max-w-5xl w-full mx-auto py-12 sm:py-20 px-4'>
			<HeroSection />
			<FeatureSection />
		</div>
	);
}
