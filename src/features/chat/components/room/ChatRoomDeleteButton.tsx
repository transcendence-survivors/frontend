'use client';

import { useTranslations } from 'next-intl';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useChatRoomDelete } from '../../hooks/room/useChatRoomActions';

interface DeleteGroupDialogProps {
	roomId: string;
}

export const ChatRoomDeleteButton = ({ roomId }: DeleteGroupDialogProps) => {
	const t = useTranslations('chat.rooms.group_settings');
	const { mutate: deleteRoom, isPending } = useChatRoomDelete(roomId);

	return (
		<Tooltip>
			<ActionConfirmDialog
				title={t('delete_group_title')}
				description={t('delete_group_description')}
				confirmText={t('delete_confirm')}
				isDestructive
				isPending={isPending}
				onConfirm={deleteRoom}
				trigger={
					<TooltipTrigger asChild>
						<Button
							type='button'
							variant='ghost'
							size='icon'
							disabled={isPending}
							aria-label={t('delete_group_button')}>
							<Trash className='size-4' aria-hidden='true' />
						</Button>
					</TooltipTrigger>
				}
			/>
			<TooltipContent>
				<p>{t('delete_group_button')}</p>
			</TooltipContent>
		</Tooltip>
	);
};
