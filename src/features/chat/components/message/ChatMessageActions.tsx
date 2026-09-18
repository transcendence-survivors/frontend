import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { TooltipContent, TooltipTrigger, Tooltip } from '@/components/ui/tooltip';
import { Pencil, Reply, Trash2 } from 'lucide-react';
import { TextChatMessage } from '../../types/message';
import { ChatMessageBubbleContent } from './bubble/ChatMessageBubbleContent';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';
import { canManageMember, ChatMemberPermissionEnum } from '../../utils/role';
import { useRoomRole, useRoomType } from '../../stores/roomSlice';

interface ChatMessageActionsProps {
	message: TextChatMessage;
	isMe: boolean;
	onEdit: (message: TextChatMessage) => void;
	onDelete: (messageId: string) => void;
	onReply: (message: TextChatMessage) => void;
}

export const ChatMessageActions = ({
	message,
	isMe,
	onEdit,
	onDelete,
	onReply,
}: ChatMessageActionsProps) => {
	const t = useTranslations('chat.messages.actions');
	const roomType = useRoomType();
	const userRole = useRoomRole();

	const canReply = true;
	const canEdit = isMe;
	const canDelete =
		isMe ||
		(roomType === 'GROUP' &&
			canManageMember({
				actorRole: userRole,
				targetRole: message.sender.role,
				permission: ChatMemberPermissionEnum.DELETE_MESSAGE,
			}));

	return (
		<aside
			className={`absolute bottom-full translate-y-1/2 mb-2 z-10
            ${isMe ? 'right-full translate-x-1/4' : 'left-full -translate-x-1/4'}
            opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
            transition-opacity duration-150 flex items-center gap-0.5 rounded-lg 
            border border-border bg-background/95 p-0.5 shadow-sm backdrop-blur-xs`}>
			{canReply && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant='ghost'
							size='icon'
							className='size-7'
							onClick={() => onReply(message)}>
							<Reply className='size-3.5' />
						</Button>
					</TooltipTrigger>
					<TooltipContent
						side='top'
						className='flex items-center gap-2 text-xs'>
						<span>{t('reply')}</span>
					</TooltipContent>
				</Tooltip>
			)}

			{canEdit && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant='ghost'
							size='icon'
							className='size-7'
							onClick={() => onEdit(message)}>
							<Pencil className='size-3.5' />
						</Button>
					</TooltipTrigger>
					<TooltipContent
						side='top'
						className='flex items-center gap-2 text-xs'>
						<span>{t('edit')}</span>
					</TooltipContent>
				</Tooltip>
			)}

			{canDelete && (
				<Tooltip>
					<ActionConfirmDialog
						title={t('dialogs.delete_title')}
						description={t('dialogs.delete_description')}
						confirmText={t('delete')}
						isDestructive
						onConfirm={() => onDelete(message.id)}
						trigger={
							<TooltipTrigger asChild>
								<Button
									variant='ghost'
									size='icon'
									className='size-7 text-destructive hover:bg-destructive/10 hover:text-destructive'>
									<Trash2 className='size-3.5' />
								</Button>
							</TooltipTrigger>
						}>
						<ChatMessageBubbleContent
							message={message}
							isMe={isMe}
							showReplyPreview={false}
						/>
					</ActionConfirmDialog>
					<TooltipContent
						side='top'
						className='flex items-center gap-2 text-xs'>
						<span>{t('delete')}</span>
					</TooltipContent>
				</Tooltip>
			)}
		</aside>
	);
};
