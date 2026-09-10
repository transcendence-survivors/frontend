'use client';

import { useTranslations } from 'next-intl';
import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';
import { useChatRoomDelete } from '../../hooks/room/useChatRoomActions';

interface DeleteGroupDialogProps {
	roomId: string;
}

export const ChatRoomDeleteButton = ({ roomId }: DeleteGroupDialogProps) => {
	const t = useTranslations('chat.rooms.group_settings');
	const { mutate: deleteRoom, isPending } = useChatRoomDelete(roomId);

	return (
		<ActionConfirmDialog
			title={t('delete_group_title')}
			description={t('delete_group_description')}
			confirmText={t('delete_confirm')}
			isDestructive
			isPending={isPending}
			onConfirm={deleteRoom}
			trigger={
				<Button
					type='button'
					variant='ghost'
					size='icon'
					aria-label={t('delete_group_button')}>
					<Trash className='size-4' aria-hidden='true' />
				</Button>
			}
		/>
	);
};
