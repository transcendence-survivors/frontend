import LandingFooter from '../../../components/layouts/Landing/LandingFooter';
import LandingHeader from '../../../components/layouts/Landing/LandingHeader';

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col min-h-dvh bg-background text-foreground'>
			<LandingHeader />
			<div className='flex-1'>{children}</div>
			<LandingFooter />
		</div>
	);
};

export default LandingLayout;
