import HubSidebar from './HubSidebar';
import HubHeader from './HubHeader';

interface HubLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const HubLayout = ({ children }: HubLayoutProps) => {
	return (
		<>
			<HubHeader className='md:hidden' />
			<HubSidebar className='w-[250px] hidden md:block' />
			<div className='md:border-x w-full min-w-0 pl-0 md:pl-[250px]'>
				{children}
			</div>
		</>
	);
};

export default HubLayout;
