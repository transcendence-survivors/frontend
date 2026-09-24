import LogoLink from '@/components/ui/logo-link';
import { cn } from '@/libs/utils';
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import DashboardNav from './DashboardNav';
import LocaleDropdownMenu from '@/modules/i18n/components/LocaleDropdownSubMenu';
import ThemeDropdownMenu from '@/modules/themes/components/ThemeDropdownSubMenu';
import AvatarDropdown from '@/features/user/components/Avatar/AvatarDropDown';

type DashboardHeaderProps = React.HTMLAttributes<HTMLElement>;

const DashboardHeader = ({ className }: DashboardHeaderProps) => {
	return (
		<header
			className={cn(
				'sticky top-0 left-0 right-0 bg-sidebar text-sidebar-foreground border-b border-sidebar-border z-40 main-header',
				className,
			)}>
			<div className='flex justify-between items-center h-full px-4 md:hidden'>
				<LogoLink className='py-3' />
				<Drawer direction='left'>
					<DrawerTrigger asChild>
						<Button variant='ghost' size='icon' className='md:hidden'>
							<Menu />
						</Button>
					</DrawerTrigger>
					<DrawerContent
						aria-describedby='nav-drawer-description'
						className='bg-sidebar text-sidebar-foreground max-w-[250px]! '>
						<DrawerHeader className='border-b border-sidebar-border'>
							<DrawerTitle className='text-lg font-semibold'>
								<LogoLink className='py-6' />
							</DrawerTitle>
						</DrawerHeader>
						<div className='no-scrollbar overflow-y-auto '>
							<DashboardNav isDrawer={true} className='w-full' />
						</div>
						<DrawerFooter>
							<div className='flex items-center gap-2'>
								<LocaleDropdownMenu className='flex-1' />
								<ThemeDropdownMenu />
							</div>
							<div className='border-t border-sidebar-border py-5 max-w-full'>
								<AvatarDropdown />
							</div>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
		</header>
	);
};

export default DashboardHeader;
