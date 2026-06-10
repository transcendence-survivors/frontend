'use client';

import AvatarProfile from '@/features/user/components/Avatar/AvatarProfile';

import { Button } from '../ui/button';
import I18nLink from '@/modules/i18n/components/I18nLink';
import AvatarProfileLink from '@/features/user/components/Avatar/AvatarProfileLink';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../ui/drawer';
import { useState } from 'react';
import LogoutDrawerClose from '@/features/auth/components/LogoutDrawerClose';

const NavDrawer = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Drawer direction='left' onOpenChange={setOpen} open={open}>
				<DrawerTrigger asChild>
					<Button variant='ghost' size='icon' className='rounded-full'>
						<AvatarProfile img={{ src: '/avatar.png', alt: 'User Avatar' }} />
					</Button>
				</DrawerTrigger>
				<DrawerContent aria-describedby='nav-drawer-description'>
					<DrawerHeader>
						<DrawerClose asChild>
							<AvatarProfileLink
								avatar={{
									img: {
										src: '',
										alt: 'test',
									},
								}}
								username='test'
							/>
						</DrawerClose>
						<DrawerTitle className='text-lg font-semibold'>
							User Profile
						</DrawerTitle>
					</DrawerHeader>
					<div className='no-scrollbar overflow-y-auto px-4'>
						{Array.from({ length: 10 }).map((_, index) => (
							<p key={index} className='mb-4 leading-normal'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Sed do eiusmod tempor incididunt ut labore et dolore magna
								aliqua. Ut enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo consequat.
								Duis aute irure dolor in reprehenderit in voluptate velit
								esse cillum dolore eu fugiat nulla pariatur. Excepteur
								sint occaecat cupidatat non proident, sunt in culpa qui
								officia deserunt mollit anim id est laborum.
							</p>
						))}
					</div>
					<DrawerFooter>
						<ul>
							<li>
								<Button variant='link' asChild>
									<DrawerClose asChild>
										<I18nLink href='profile'>Profile</I18nLink>
									</DrawerClose>
								</Button>
							</li>
							<li>
								<Button variant='link' asChild>
									<DrawerClose asChild>
										<I18nLink href='posts'>Settings</I18nLink>
									</DrawerClose>
								</Button>
							</li>
							<li></li>
						</ul>
						<LogoutDrawerClose />
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default NavDrawer;
