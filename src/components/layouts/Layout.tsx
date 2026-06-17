import PcHeader from './Headers/Pc';
import PhoneHeader from './Headers/Phone';
import PhoneNav from './PhoneNav';
import SideNav from './SideNav';

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const Layout = ({ children, ...props }: LayoutProps) => {
	return (
		<>
			<div className='md:hidden'>
				<PhoneHeader />
			</div>
			<div className='hidden md:block'>
				<PcHeader />
			</div>
			<div className='max-w-4xl mx-auto w-full'>
				<div className='layout' {...props}>
					<div className='hidden sm:flex justify-end'>
						<SideNav
							className='sticky-sidebar scrollableContainer'
							align='right'
						/>
					</div>
					<div className='border-x w-full'>{children}</div>
				</div>
			</div>
			<div className='md:hidden'>
				<PhoneNav />
			</div>
		</>
	);
};

export default Layout;
