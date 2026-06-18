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
			<div className='header'>
				<div className='md:hidden h-full'>
					<PhoneHeader className='h-full' />
				</div>
				<div className='hidden md:block h-full'>
					<PcHeader className='h-full' />
				</div>
			</div>
			<div className='max-w-4xl mx-auto w-full'>
				<div className='layout '>
					<aside className='hidden sm:flex justify-end'>
						<SideNav
							className='sticky-sidebar scrollableContainer'
							align='left'
						/>
					</aside>
					<div className='border-x w-full min-w-0'>{children}</div>
				</div>
			</div>
			<aside className='md:hidden'>
				<PhoneNav />
			</aside>
		</>
	);
};

export default Layout;
