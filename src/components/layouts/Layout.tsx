import DashboardSidebar from './Dashboard/DashboardSidebar';
import PcHeader from './Headers/Pc';
import PhoneHeader from './Headers/Phone';
import PhoneNav from './PhoneNav';
import SideNav from './SideNav';

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			{/* <div className='header'>
				<div className='md:hidden h-full'>
					<PhoneHeader className='h-full' />
				</div>
				<div className='hidden md:block h-full'>
					<PcHeader className='h-full' />
				</div>
			</div> */}

			<div className='w-full'>
				<DashboardSidebar className='w-[250px]' />
				<div className='border-x w-full min-w-0 pl-[250px]'>{children}</div>
			</div>
			{/* <aside className='md:hidden'>
				<PhoneNav />
			</aside> */}
		</>
	);
};

export default Layout;
