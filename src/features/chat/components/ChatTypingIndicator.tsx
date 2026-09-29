import { cn } from '@/libs/utils';
import { useTypingUsers } from '../stores/typingSlice';
import { useTranslations } from 'next-intl';

interface ChatTypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
	roomId: string;
}

export const ChatTypingIndicator = ({
	roomId,
	className,
	...props
}: ChatTypingIndicatorProps) => {
	const typingUsers = useTypingUsers(roomId);
	const t = useTranslations('chat.messages.actions');

	if (typingUsers.length === 0) return null;

	const firstUser = typingUsers[0].displayName;
	const remainingCount = typingUsers.length - 1;

	return (
		<div
			className={cn('text-xs text-muted-foreground italic px-2', className)}
			{...props}>
			{typingUsers.length === 1
				? t.rich('rich_is_typing', {
						strong: () => (
							<strong className='text-foreground font-semibold'>
								{firstUser}
							</strong>
						),
					})
				: t.rich('rich_are_typing', {
						count: remainingCount,
						strong: () => (
							<strong className='text-foreground font-semibold'>
								{firstUser}
							</strong>
						),
					})}
		</div>
	);
};
