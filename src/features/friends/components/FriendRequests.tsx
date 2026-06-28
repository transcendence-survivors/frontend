'use client';

import { Spinner } from '@/components/ui/spinner';
import { useRequests } from '../hooks/useRequest';
import { FriendRequestActions } from './actions/FriendRequestActions';
import { FriendCard } from './FriendCard';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Kicker from '@/components/ui/kicker';
import { cn } from '@/libs/utils';
import { FriendRequestsLoading } from './FriendRequestsLoading';
import { FriendRequestsError } from './FriendRequestsError';

interface FriendRequestsProps extends React.HTMLAttributes<HTMLDivElement> {}

const FriendRequests = ({ className }: FriendRequestsProps) => {
	const { ref, inView } = useInView({ threshold: 0 });
	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useRequests({ direction: 'incoming' });

	useEffect(() => {
		if (!inView) return;
		if (!hasNextPage) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) {
		return <FriendRequestsLoading numberOfSkeletons={20} className='pt-8' />;
	}
	if (isError || !data) {
		return <FriendRequestsError />;
	}

	const totalRequests = data.pages[0].meta.total;
	return (
		<>
			<header className={cn('flex items-center', className)}>
				<Kicker className='ml-auto'>
					{totalRequests} Incoming Friend Requests
				</Kicker>
			</header>
			<ul>
				{data.pages.map((page) =>
					page.data.map(({ id, friend }) => (
						<li key={id}>
							<FriendCard friend={friend}>
								<FriendRequestActions
									friendId={friend.id}
									friendDisplayName={friend.displayName}
								/>
							</FriendCard>
						</li>
					)),
				)}
			</ul>
			{hasNextPage && (
				<div ref={ref} className='flex justify-center py-4'>
					{isFetchingNextPage && <Spinner className='size-6' />}
				</div>
			)}
		</>
	);
};

export { FriendRequests };
