import { cn } from '@/libs/utils';
import { useTypingUsers } from '../stores/typingSlice';

interface ChatTypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
	roomId: string;
}

const MaxTypingUsersToShow = 3;

export const ChatTypingIndicator = ({
	roomId,
	className,
	...props
}: ChatTypingIndicatorProps) => {
	const typingUsers = useTypingUsers(roomId);
	if (typingUsers.length === 0) return null;

	return (
		<div
			className={cn('text-xs text-muted-foreground italic px-2', className)}
			{...props}>
			{typingUsers.length === 1 ? (
				<>
					<strong className='text-foreground'>
						{typingUsers[0].displayName}
					</strong>{' '}
					is typing…
				</>
			) : (
				Array.from({
					length: Math.min(typingUsers.length, MaxTypingUsersToShow),
				}).map((_, index) => (
					<span key={index}>
						<strong className='text-foreground'>
							{typingUsers[index].displayName}
						</strong>
						{index < Math.min(typingUsers.length, MaxTypingUsersToShow) - 1
							? ', '
							: ''}
					</span>
				))
			)}
			{typingUsers.length > MaxTypingUsersToShow && (
				<span>
					{' '}
					and {typingUsers.length - MaxTypingUsersToShow} more are typing…
				</span>
			)}
		</div>
	);
};
