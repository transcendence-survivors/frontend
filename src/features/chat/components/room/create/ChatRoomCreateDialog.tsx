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
import { UseChatRoomsParams } from '@/features/chat/hooks/room/useChatRooms';
import { useTranslations } from 'next-intl';

interface ChatRoomCreateDialogProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	params: UseChatRoomsParams;
}

const ChatRoomCreateDialog = ({ children, params }: ChatRoomCreateDialogProps) => {
	const t = useTranslations('chat.rooms.create');

	const [open, setOpen] = useState(false);
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
		setOpen(false);
	}, []);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<div className='flex flex-col gap-2 max-h-[60vh] '>
					<DialogHeader className='flex flex-col mb-2'>
						<DialogTitle className='text-2xl font-semibold'>
							{t('title')}
						</DialogTitle>
						<DialogDescription>{t('description')}</DialogDescription>
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
