import LandingFooter from '../../../components/layouts/Landing/LandingFooter';
import LandingHeader from '../../../components/layouts/Landing/LandingHeader';

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<LandingHeader />
			<main>{children}</main>
			<LandingFooter />
		</>
	);
};

export default LandingLayout;
