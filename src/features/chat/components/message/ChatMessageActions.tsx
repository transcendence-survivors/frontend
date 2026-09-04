import { Button } from '@/components/ui/button';
import { TooltipContent, TooltipTrigger, Tooltip } from '@/components/ui/tooltip';
import { Pencil, Reply, Trash2 } from 'lucide-react';
import { ChatMessage } from '../../types/message';
import { memo } from 'react';
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialog,
} from '@/components/ui/alert-dialog';
import { ChatMessageContent } from './ChatMessageContent';

interface ChatMessageActionsProps {
	message: ChatMessage;
	isMe: boolean;
	onEdit?: (message: ChatMessage) => void;
	onDelete?: (messageId: string) => void;
	onReply?: (message: ChatMessage) => void;
}

export const ChatMessageActions = memo(
	({ message, isMe, onEdit, onDelete, onReply }: ChatMessageActionsProps) => {
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
							<span>Reply</span>
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
							<span>Edit</span>
						</TooltipContent>
					</Tooltip>
				)}

				{onDelete && (
					<AlertDialog>
						<Tooltip>
							<TooltipTrigger asChild>
								<AlertDialogTrigger asChild>
									<Button
										variant='ghost'
										size='icon'
										className='size-7 text-destructive hover:bg-destructive/10 hover:text-destructive'>
										<Trash2 className='size-3.5' />
									</Button>
								</AlertDialogTrigger>
							</TooltipTrigger>
							<TooltipContent
								side='top'
								className='flex items-center gap-2 text-xs'>
								<span>Delete</span>
							</TooltipContent>
						</Tooltip>

						<AlertDialogContent className='p-0 bg-card gap-0'>
							<AlertDialogHeader className='p-4 space-y-2'>
								<AlertDialogTitle>Delete message ?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This message will be
									permanently removed from the conversation.
								</AlertDialogDescription>

								<div className='max-h-[65vh] overflow-y-auto rounded-lg border border-border/50 bg-background w-full'>
									<ChatMessageContent
										message={message}
										isMe={isMe}
										showReplyPreview={false}
									/>
								</div>
							</AlertDialogHeader>

							<AlertDialogFooter className='px-4 py-3 border-t border-border bg-muted flex items-center justify-end gap-4'>
								<AlertDialogCancel variant='outline' className='flex-1'>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									variant='destructive'
									onClick={() => onDelete(message.id)}
									className='flex-1'>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}
			</aside>
		);
	},
);
ChatMessageActions.displayName = 'ChatMessageActions';
