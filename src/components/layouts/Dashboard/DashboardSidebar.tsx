import LogoLink from '@/components/ui/logo-link';
import { cn } from '@/libs/utils';
import DashboardNav from './DashboardNav';
import Kicker from '@/components/ui/kicker';
import AvatarDropdown from '@/features/user/components/Avatar/AvatarDropDown';
import LocaleDropdownMenu from '@/modules/i18n/components/LocaleDropdownSubMenu';
import ThemeDropdownMenu from '@/modules/themes/components/ThemeDropdownSubMenu';

type DashboardSidebarProps = React.HTMLAttributes<HTMLElement>;

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
						<LogoLink className='w-full py-6' />
					</div>
				</div>

				<nav className='flex-1 overflow-y-auto py-1'>
					<Kicker className='py-2 px-5'>Player Hub</Kicker>
					<DashboardNav />
					<div className='px-3 py-3 space-y-2 mt-auto'></div>
				</nav>

				<div className='px-3 py-3 space-y-2'>
					<div className='flex items-center gap-2'>
						<LocaleDropdownMenu className='flex-1' />
						<ThemeDropdownMenu />
					</div>
					<div className='border-t border-sidebar-border py-5 max-w-full'>
						<AvatarDropdown />
					</div>
				</div>
			</div>
		</aside>
	);
};

export default DashboardSidebar;
