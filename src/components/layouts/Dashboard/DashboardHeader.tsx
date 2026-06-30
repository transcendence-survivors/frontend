import LogoLink from '@/components/ui/logo-link';
import NavDrawer from './DashboardDrawer';
import { cn } from '@/libs/utils';

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLElement> {}

const DashboardHeader = ({ className }: DashboardHeaderProps) => {
	return (
		<header
			className={cn(
				'sticky top-0 left-0 right-0 bg-sidebar text-sidebar-foreground border-b border-sidebar-border z-40 main-header',
				className,
			)}>
			<div className='flex justify-between items-center h-full px-4'>
				<LogoLink />
				<NavDrawer />
			</div>
		</header>
	);
};

export default DashboardHeader;
