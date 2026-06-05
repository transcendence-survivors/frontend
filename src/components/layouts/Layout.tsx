import Header from './Header';
import PhoneNav from './PhoneNav';
import SideNav from './SideNav';

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const Layout = ({ children, ...props }: LayoutProps) => {
	return (
		<>
			<Header className='header' />
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
			<PhoneNav />
		</>
	);
};

export default Layout;
