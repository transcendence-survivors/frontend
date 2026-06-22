import LogoLink from '@/components/ui/logo-link';
import { cn } from '@/libs/utils';
import DashboardNav from './DashboardNav';
import Kicker from '@/components/ui/kicker';
import AvatarDropdown from '@/features/user/components/Avatar/AvatarDropDown';

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLElement> {}

const DashboardSidebar = ({ className, ...props }: DashboardSidebarProps) => {
	return (
		<aside
			className={cn(
				'fixed max-h-dvh top-0 left-0 bottom-0 bg-sidebar text-sidebar-foreground/80 border-r border-sidebar-border z-40 overflow-clip',
				className,
			)}
			{...props}>
			<div className='flex flex-col h-full'>
				<div className='px-3 py-3 space-y-2'>
					<div className='border-b border-sidebar-border py-2'>
						<LogoLink className='w-full' />
					</div>
				</div>

				<nav className='flex-1 overflow-y-auto py-1'>
					<Kicker className='py-2 px-5'>Player Hub</Kicker>
					<DashboardNav />
				</nav>

				<div className='px-3 py-3 space-y-2'>
					<div className='border-t border-sidebar-border py-5 max-w-full'>
						<AvatarDropdown
							className='py-2'
							avatar={{
								img: {
									src: 'https://example.com/avatar.jpg',
									alt: 'test',
								},
							}}
							user={{
								username: 'john_doeasdawdawdaasdawdawdawdw',
								displayName: 'John Doe',
							}}
						/>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default DashboardSidebar;
