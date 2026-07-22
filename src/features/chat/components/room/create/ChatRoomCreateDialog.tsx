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
import ChatCreateButton from './ChatCreateButton';
import { Input } from '@/components/ui/input';
import { UseChatRoomsParams } from '@/features/chat/hooks/useChatRooms';

interface ChatRoomCreateDialogProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	params: UseChatRoomsParams;
}

const ChatRoomCreateDialog = ({ children, params }: ChatRoomCreateDialogProps) => {
	const [selectedUsers, setSelectedUsers] = useState<BaseUser[]>([]);
	const [groupName, setGroupName] = useState<string>('');

	const handleUserSelect = useCallback((user: BaseUser) => {
		setSelectedUsers((prev) => {
			const exists = prev.some(({ id }) => id === user.id);
			return exists ? prev.filter(({ id }) => id !== user.id) : [...prev, user];
		});
	}, []);

	const clearSelectedUsers = useCallback(() => {
		setSelectedUsers([]);
		setGroupName('');
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
							<div className='flex gap-2'>
								<ChatSelectedUsersPreview users={selectedUsers} />
								{selectedUsers.length > 1 && (
									<Input
										placeholder='Group Name'
										value={groupName}
										onChange={(e) => setGroupName(e.target.value)}
									/>
								)}
							</div>
							<ChatCreateButton
								groupName={groupName}
								onMutationSuccess={clearSelectedUsers}
								usersIds={selectedUsers.map(({ id }) => id)}
								params={params}
							/>
						</div>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ChatRoomCreateDialog;
