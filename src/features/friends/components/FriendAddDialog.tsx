import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';
import { UserCard } from './UserCard';

const FriendAddDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<UserPlus className='size-3.5' />
					<span>Add Friend</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-xl font-semibold'>
						Add Bearers in Your Circle
					</DialogTitle>
				</DialogHeader>
				<div>
					<Input placeholder="Enter bearer's username" className='w-full' />
					<ul>
						<li className='py-2'>
							<UserCard
								friend={{
									id: 'test',
									displayName: 'jean-louis',
									username: 'jean_louis',
									avatarUrl:
										'https://images.unsplash.com/photo-1682685794700-1e3f5c7b6d8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
								}}>
								<Button variant='outline' className='ml-auto'>
									<UserPlus className='size-3.5' />
								</Button>
							</UserCard>
						</li>
					</ul>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='default'>Cancel</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default FriendAddDialog;
