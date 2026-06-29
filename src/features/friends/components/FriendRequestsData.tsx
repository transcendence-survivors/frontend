'use client';

import { Spinner } from '@/components/ui/spinner';
import { useRequests } from '../hooks/useRequest';
import { FriendRequestActions } from './actions/FriendRequestActions';
import { FriendCard } from './FriendCard';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FriendRequestsLoading } from './FriendRequestsLoading';
import { FriendsError } from './FriendRequestsError';
import { FriendRequestDirection } from '../api/get';
import Kicker from '@/components/ui/kicker';
import DisplayDate from '@/components/ui/date';

interface FriendRequestsProps extends React.HTMLAttributes<HTMLDivElement> {
	direction: FriendRequestDirection;
}

const FriendRequestsData = ({ direction }: FriendRequestsProps) => {
	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: '0px 0px 100px 0px',
	});
	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useRequests({ direction });

	useEffect(() => {
		if (!inView) return;
		if (!hasNextPage) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) {
		return <FriendRequestsLoading numberOfSkeletons={10} direction={direction} />;
	}
	if (isError || !data) {
		return (
			<FriendsError>
				Failed to load friend requests. Please try again later.
			</FriendsError>
		);
	}

	const friends = data.pages.flatMap((page) => page.data);
	return (
		<>
			{friends.length === 0 ? (
				<FriendsError className='text-muted-foreground'>
					No {direction === 'incoming' ? 'incoming' : 'outgoing'} friend
					requests
				</FriendsError>
			) : (
				<ul>
					{friends.map(({ id, friend, since }) => (
						<li key={id}>
							<FriendCard
								friend={friend}
								bottom={
									<div className='mt-3'>
										<Kicker>
											{direction === 'incoming'
												? 'Received'
												: 'Sent'}{' '}
											<DisplayDate date={new Date(since)} />
										</Kicker>
									</div>
								}>
								<div className='flex items-center gap-4'>
									<FriendRequestActions
										friendId={friend.id}
										friendDisplayName={friend.displayName}
										direction={direction}
									/>
								</div>
							</FriendCard>
						</li>
					))}
				</ul>
			)}
			{hasNextPage && (
				<div ref={ref} className='flex justify-center py-4'>
					{isFetchingNextPage && <Spinner className='size-6' />}
				</div>
			)}
		</>
	);
};

export { FriendRequestsData };
