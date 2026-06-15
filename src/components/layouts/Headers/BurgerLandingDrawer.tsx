'use client';

import { Button } from '@/components/ui/button';
import { NavLink } from '@/modules/i18n/utils/navigation';
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerTitle,
	DrawerHeader,
	DrawerFooter,
	DrawerDescription,
	DrawerClose,
} from '@ui/drawer';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { VisuallyHidden } from 'radix-ui';
import { useTransition } from 'react';

const navLinks: NavLink[] = [
	{
		key: 'landing',
		labelKey: 'concept',
	},
	{
		key: 'landing',
		labelKey: 'game',
	},
	{
		key: 'landing',
		labelKey: 'home',
	},
	{
		key: 'landing',
		labelKey: 'leaderboard',
	},
	{
		key: 'landing',
		labelKey: 'posts',
	},
];

function BurgerLandingDrawer() {
	const t = useTranslations('nav');
	return (
		<Drawer direction='left'>
			<DrawerTrigger asChild>
				<Button variant='ghost' size='icon-lg' className='rounded-full'>
					<Menu />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className='gap-7'>
					<DrawerTitle className='hidden'>Test</DrawerTitle>
					{navLinks.map((link, i) => (
						<Button
							key={i}
							variant={'link'}
							className='text-4xl bg-transparent text-foreground'>
							{t(link.labelKey)}
						</Button>
					))}
				</DrawerHeader>
				<DrawerFooter>
					<Button>Login</Button>
					<DrawerClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

export default BurgerLandingDrawer;
