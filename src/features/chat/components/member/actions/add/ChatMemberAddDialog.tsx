'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BaseUser } from '@/features/user/type';
import ChatSelectedUsersPreview from '../../../room/create/ChatSelectedUsersPreview';
import { useChatMembersAdd } from '@/features/chat/hooks/member/useChatMemberAdd';
import { Spinner } from '@/components/ui/spinner';
import ChatMembersAddUsersSearch from './ChatMemberAddUsersSearch';

interface ChatMemberAddDialogProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	roomId: string;
}

const ChatMembersAddDialog = ({ children, roomId }: ChatMemberAddDialogProps) => {
	const t = useTranslations('chat.members.dialogs.add');

	const [open, setOpen] = useState(false);
	const [selectedUsers, setSelectedUsers] = useState<BaseUser[]>([]);

	const { mutate: addMembers, isPending } = useChatMembersAdd(roomId);

	const handleUserSelect = useCallback((user: BaseUser) => {
		setSelectedUsers((prev) => {
			const exists = prev.some(({ id }) => id === user.id);
			return exists ? prev.filter(({ id }) => id !== user.id) : [...prev, user];
		});
	}, []);

	const handleReset = useCallback(() => {
		setSelectedUsers([]);
		setOpen(false);
	}, []);

	const handleOpenChange = (newOpen: boolean) => {
		if (!newOpen) {
			setSelectedUsers([]);
		}
		setOpen(newOpen);
	};

	const handleSubmit = () => {
		if (!selectedUsers.length) return;

		addMembers(
			selectedUsers.map(({ id }) => id),
			{ onSuccess: handleReset },
		);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='sm:max-w-[480px]'>
				<div className='flex flex-col gap-2 max-h-[70vh] min-h-0'>
					<DialogHeader className='flex flex-col mb-2'>
						<DialogTitle className='text-2xl font-semibold'>
							{t('title')}
						</DialogTitle>
						<DialogDescription>{t('description')}</DialogDescription>
					</DialogHeader>

					<ChatMembersAddUsersSearch
						selectedUsers={selectedUsers}
						onUserSelect={handleUserSelect}
					/>

					<DialogFooter>
						<div className='flex flex-col justify-between gap-3 w-full pt-3 border-t border-border'>
							<div className='flex gap-2'>
								<ChatSelectedUsersPreview
									users={selectedUsers}
									noUsersSelectedText={t('no_users_selected')}
								/>
							</div>
							<Button
								onClick={handleSubmit}
								disabled={isPending || selectedUsers.length === 0}>
								{isPending ? <Spinner className='size-4' /> : t('add')}
							</Button>
						</div>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ChatMembersAddDialog;
