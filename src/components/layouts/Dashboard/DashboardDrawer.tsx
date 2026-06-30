import { Button } from '../../ui/button';
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../../ui/drawer';
import LogoutDrawerClose from '@/features/auth/components/LogoutDrawerClose';
import { Menu } from 'lucide-react';
import DashboardNav from './DashboardNav';
import LogoLink from '../../ui/logo-link';

const NavDrawer = () => {
	return (
		<>
			<Drawer direction='left'>
				<DrawerTrigger asChild>
					<Button variant='ghost' size='icon' className='md:hidden'>
						<Menu />
					</Button>
				</DrawerTrigger>
				<DrawerContent
					aria-describedby='nav-drawer-description'
					className='bg-sidebar text-sidebar-foreground max-w-[250px]'>
					<DrawerHeader>
						<DrawerTitle className='text-lg font-semibold'>
							<LogoLink />
						</DrawerTitle>
					</DrawerHeader>
					<div className='no-scrollbar overflow-y-auto '>
						<DashboardNav isDrawer={true} className='w-full' />
					</div>
					<DrawerFooter>
						<LogoutDrawerClose />
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default NavDrawer;
