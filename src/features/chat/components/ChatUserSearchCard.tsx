'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { UserCard, UserCardSkeleton } from '@/features/user/components/UserCard';
import { BaseUserCardProps } from '@/features/user/components/UsersFeedData';
import { BaseUser } from '@/features/user/type';
import { Plus } from 'lucide-react';
import { memo, useCallback } from 'react';

interface ChatUserButtonProps extends BaseUserCardProps {
	onClick: (user: BaseUser) => void;
	isSelectedFn: (userId: string) => boolean;
}

export const ChatUserSearchCard = memo(
	({ user, onClick, isSelectedFn }: ChatUserButtonProps) => {
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
	},
	(prevProps, nextProps) => {
		const isUserUnchanged = prevProps.user.id === nextProps.user.id;
		const isOnClickUnchanged = prevProps.onClick === nextProps.onClick;

		const wasSelected = prevProps.isSelectedFn(prevProps.user.id);
		const isSelectedNow = nextProps.isSelectedFn(nextProps.user.id);
		const isSelectedUnchanged = wasSelected === isSelectedNow;

		return isUserUnchanged && isOnClickUnchanged && isSelectedUnchanged;
	},
);

export const ChatUserSearchCardSkeleton = () => {
	return (
		<UserCardSkeleton>
			<Skeleton className='size-4' />
		</UserCardSkeleton>
	);
};

ChatUserSearchCard.displayName = 'ChatUserCard';
