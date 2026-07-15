'use client';

import { useCallback, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { BaseUser } from '@/features/user/type';
import ChatSelectedUsersPreview from './ChatSelectedUsersPreview';
import ChatUsersSearch from './ChatUsersSearch';
import ChatCreateButton from './create/ChatCreateButton';

interface ChatCreateDialogProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const ChatCreateDialog = ({ children }: ChatCreateDialogProps) => {
	const [selectedUsers, setSelectedUsers] = useState<BaseUser[]>([]);

	const handleUserSelect = useCallback((user: BaseUser) => {
		setSelectedUsers((prev) => {
			const exists = prev.some(({ id }) => id === user.id);
			return exists ? prev.filter(({ id }) => id !== user.id) : [...prev, user];
		});
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<div className='flex flex-col gap-2 max-h-[60vh] '>
					<DialogHeader>
						<DialogTitle className='text-2xl font-semibold'>
							Create a new chat
						</DialogTitle>

						<DialogDescription>
							Create a new chat and invite your friends to join.
						</DialogDescription>
					</DialogHeader>
					<ChatUsersSearch
						selectedUsers={selectedUsers}
						onUserSelect={handleUserSelect}
					/>
					<DialogFooter>
						<div className='flex flex-col justify-between gap-3 w-full pt-3 border-t border-border'>
							<ChatSelectedUsersPreview users={selectedUsers} />
							<ChatCreateButton
								usersIds={selectedUsers.map(({ id }) => id)}
							/>
						</div>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ChatCreateDialog;
