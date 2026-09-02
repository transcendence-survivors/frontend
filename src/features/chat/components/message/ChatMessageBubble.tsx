import { MediaModal } from '@/components/ui/media-modal';
import { ChatMessage } from '../../types/message';
import { AvatarProfileLink } from '@/features/user/components/Avatar/AvatarProfile';
import DisplayDate from '@/components/ui/date';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatMessageProps {
	message: ChatMessage;
	isMe: boolean;
	prevUserId?: string;
}

const ChatMessageBubble = ({ message, isMe, prevUserId }: ChatMessageProps) => {
	return (
		<div className={`flex ${isMe ? 'justify-end' : 'justify-start'} space-x-3 `}>
			<div className='w-8'>
				{!isMe && message.sender.id !== prevUserId && (
					<AvatarProfileLink
						avatar={{
							img: {
								src: message.sender.avatarUrl ?? '',
								alt: message.sender.displayName,
							},
							size: 'sm',
						}}
						username={message.sender.username}
					/>
				)}
			</div>

			<div className='max-w-[80%] w-fit'>
				<div
					className={`w-fit rounded-md px-3.5 py-2 text-sm ${
						isMe
							? 'bg-primary text-primary-foreground'
							: 'bg-card border border-border'
					}`}>
					{message.content}
					{message.attachmentUrls && message.attachmentUrls.length > 0 && (
						<div className='mt-2 flex flex-wrap gap-2'>
							{message.attachmentUrls.map((url, index) => (
								<div
									key={index}
									className='size-20 overflow-hidden rounded-md border border-border bg-muted'>
									<MediaModal
										src={url}
										alt={`Attachment ${index + 1}`}
										type={url.endsWith('.mp4') ? 'video' : 'image'}
										thumbnailClassName='size-full rounded-none'
										modalClassName='min-w-[300px] min-h-[300px] max-h-[85vh]'
									/>
								</div>
							))}
						</div>
					)}
				</div>
				<div
					className={`mt-1 font-mono text-[10px] text-muted-foreground ${isMe ? 'text-right' : ''}`}>
					<DisplayDate date={new Date(message.createdAt)} max_ago='DAY' />
				</div>
			</div>
		</div>
	);
};

const ChatMessageBubbleSkeleton = () => {
	return (
		<div className='flex justify-start space-x-3'>
			<div className='w-8'>
				<Skeleton className='size-8 rounded-full' />
			</div>
			<div className='max-w-[80%] w-fit'>
				<Skeleton className='w-[300px] rounded-md px-3.5 h-10' />
				<Skeleton className='mt-1 h-2 w-12 rounded' />
			</div>
		</div>
	);
};

export { ChatMessageBubble, ChatMessageBubbleSkeleton };
