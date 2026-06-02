import Header from './Header';
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
					<div className='bg-sidebar text-sidebar-foreground px-4 flex justify-end'>
						<SideNav
							className='sticky-sidebar scrollableContainer'
							align='right'
						/>
					</div>
					{children}
				</div>
			</div>
		</>
	);
};

export default Layout;
