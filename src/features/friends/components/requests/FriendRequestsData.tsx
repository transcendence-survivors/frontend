'use client';

import { Spinner } from '@/components/ui/spinner';
import { useRequests, type UseRequestsParams } from '../../hooks/useRequest';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FriendRequestsLoading } from './FriendRequestsLoading';
import { FriendsError } from '../FriendRequestsError';
import { FriendRequestCard } from './FriendRequestCard';
import { useTranslations } from 'next-intl';

interface FriendRequestsProps
	extends React.HTMLAttributes<HTMLDivElement>, UseRequestsParams {}

const FriendRequestsData = ({
	direction,
	search,
}: FriendRequestsProps & { search: string }) => {
	const t = useTranslations('friend_page.requests');
	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: '0px 0px 100px 0px',
	});
	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useRequests({ direction, search });

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
		return <FriendsError>{t('fetch_error')}</FriendsError>;
	}

	const friends = data.pages.flatMap((page) => page.data);
	const isDuplicate = (friendId: string) => {
		const friendIds = friends.map((friend) => friend.id);
		return friendIds.filter((id) => id === friendId).length > 1;
	};

	const uniqueFriends = friends.filter((friend) => !isDuplicate(friend.id));
	console.log('uniqueFriends:', uniqueFriends, 'vs friends:', friends);

	return (
		<>
			{friends.length === 0 ? (
				<FriendsError className='text-muted-foreground'>
					{!search
						? direction === 'incoming'
							? t('no_incoming_requests')
							: t('no_outgoing_requests')
						: t(
								direction === 'incoming'
									? 'no_incoming_requests_search'
									: 'no_outgoing_requests_search',
							)}
				</FriendsError>
			) : (
				<ul className='flex flex-col gap-0'>
					{friends.map(({ id, friend, since }) => (
						<li key={id}>
							<FriendRequestCard
								friend={friend}
								since={since}
								direction={direction}
							/>
						</li>
					))}
				</ul>
			)}
			{hasNextPage && (
				<div ref={ref} className='flex justify-center py-4'>
					{isFetchingNextPage && <Spinner className='size-6' />}
				</div>
			)}
			{!hasNextPage && friends.length > 0 && (
				<div className='flex justify-center py-4 text-muted-foreground text-sm'>
					{t(
						direction === 'incoming'
							? 'no_more_incoming_requests'
							: 'no_more_outgoing_requests',
					)}
				</div>
			)}
		</>
	);
};

export { FriendRequestsData };
