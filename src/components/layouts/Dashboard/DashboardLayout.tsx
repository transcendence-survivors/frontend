import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<DashboardHeader className='md:hidden' />
			<DashboardSidebar className='w-[250px] hidden md:block' />
			<div className='md:border-x w-full min-w-0 pl-0 md:pl-[250px]'>
				{children}
			</div>
		</>
	);
};

export default Layout;
