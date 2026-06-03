'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import AvatarProfile from '@/features/user/components/Avatar/AvatarProfile';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../ui/dialog';

const NavModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger>
					<Button variant='ghost' size='icon' className='rounded-full' asChild>
						<AvatarProfile img={{ src: '/avatar.png', alt: 'User Avatar' }} />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogClose>
						<Button variant='outline' asChild>
							<span>Cancel</span>
						</Button>
					</DialogClose>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default NavModal;
