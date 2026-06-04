'use client';

import { useState } from 'react';
import AvatarProfile from '@/features/user/components/Avatar/AvatarProfile';

import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import I18nLink from '@/modules/i18n/components/I18nLink';
import AvatarProfileLink from '@/features/user/components/Avatar/AvatarProfileLink';

const NavSheet = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button variant='ghost' size='icon' className='rounded-full'>
						<AvatarProfile img={{ src: '/avatar.png', alt: 'User Avatar' }} />
					</Button>
				</SheetTrigger>
				<SheetContent side='left'>
					<SheetHeader>
						<AvatarProfileLink
							avatar={{
								img: {
									src: '',
									alt: 'test',
								},
							}}
							username='test'
						/>
						<SheetTitle className='text-lg font-semibold'>
							User Profile
						</SheetTitle>
					</SheetHeader>
					<div className='grid flex-1 auto-rows-min gap-6 px-4'>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure
							inventore amet quasi commodi repudiandae ipsam soluta, itaque
							optio cumque aut pariatur a corrupti debitis rerum beatae
							recusandae, id quibusdam! Voluptate et, libero ducimus qui
							quasi obcaecati rem eum modi. Laudantium vel impedit fuga
							maxime ipsum, a quos perferendis accusantium exercitationem in
							consectetur delectus quisquam labore, nulla placeat expedita
							odit totam aliquam commodi quaerat aut reiciendis facere? Vero
							dolor incidunt illum cupiditate quibusdam fugiat officiis
							praesentium autem et enim! Explicabo ad nostrum ex nihil
							earum? Quaerat, corporis illo libero temporibus voluptatibus
							animi. Explicabo incidunt dolorem error, expedita impedit aut
							dolor tempora.
						</p>
					</div>
					<SheetFooter>
						<ul>
							<li>
								<Button variant='link' asChild>
									<I18nLink href='profile'>Profile</I18nLink>
								</Button>
							</li>
							<li>
								<Button variant='link' asChild>
									<I18nLink href='posts'>Settings</I18nLink>
								</Button>
							</li>
						</ul>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default NavSheet;
