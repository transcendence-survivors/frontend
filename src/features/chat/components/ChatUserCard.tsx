'use client';

import { Button } from '@/components/ui/button';
import { UserCard } from '@/features/user/components/UserCard';
import { BaseUserCardProps } from '@/features/user/components/UsersFeedData';
import { BaseUser } from '@/features/user/type';
import { Plus } from 'lucide-react';
import { memo, useCallback } from 'react';

interface ChatUserButtonProps extends BaseUserCardProps {
	onClick: (user: BaseUser) => void;
	isSelectedFn: (userId: string) => boolean;
}

const ChatUserCard = memo(({ user, onClick, isSelectedFn }: ChatUserButtonProps) => {
	const handleClick = useCallback(() => {
		onClick(user);
	}, [onClick, user]);

	return (
		<Button
			variant='sidebar'
			size='icon'
			onClick={handleClick}
			data-active={isSelectedFn(user.id)}
			className='w-full h-auto p-0'>
			<UserCard user={user} className='w-full py-2' useIdentityLink={false}>
				<Plus className='size-4' />
			</UserCard>
		</Button>
	);
});

ChatUserCard.displayName = 'ChatUserCard';
export default ChatUserCard;
