import { memo } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { TooltipContent, TooltipTrigger, Tooltip } from '@/components/ui/tooltip';
import { Pencil, Reply, Trash2 } from 'lucide-react';
import { ChatMessage } from '../../types/message';
import { ChatMessageBubbleContent } from './bubble/ChatMessageBubbleContent';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';

interface ChatMessageActionsProps {
	message: ChatMessage;
	isMe: boolean;
	onEdit?: (message: ChatMessage) => void;
	onDelete?: (messageId: string) => void;
	onReply?: (message: ChatMessage) => void;
}

export const ChatMessageActions = memo(
	({ message, isMe, onEdit, onDelete, onReply }: ChatMessageActionsProps) => {
		const t = useTranslations('chat.messages.actions');

		if (!onReply && !onEdit && !onDelete) return null;

		return (
			<aside
				className={`absolute bottom-full translate-y-1/2 mb-2 z-10
            ${isMe ? 'right-full translate-x-1/4' : 'left-full -translate-x-1/4'}
            opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
            transition-opacity duration-150 flex items-center gap-0.5 rounded-lg 
            border border-border bg-background/95 p-0.5 shadow-sm backdrop-blur-xs`}>
				{onReply && (
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

				{onEdit && (
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

				{onDelete && (
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
	},
);

ChatMessageActions.displayName = 'ChatMessageActions';
