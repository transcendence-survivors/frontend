'use client';

import { Spinner } from '@/components/ui/spinner';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { FriendsLoading } from './FriendsLoading';
import { FriendCard } from './FriendCard';
import { PresencePublicActions } from '@/modules/websocket/types/presence';
import { RelationShipError } from '../../components/RelationShipError';
import { useFriends, type UseFriendsParams } from '../hooks/useFriends';

interface FriendRequestHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	getFriendStatus: PresencePublicActions['getFriendStatus'];
	params: UseFriendsParams;
}

const FriendsData = ({ getFriendStatus, params }: FriendRequestHeaderProps) => {
	const t = useTranslations('friend_page.friends');
	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: '0px 0px 100px 0px',
	});
	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useFriends(params);

	useEffect(() => {
		if (!inView) return;
		if (!hasNextPage) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) {
		return <FriendsLoading numberOfSkeletons={10} />;
	}
	if (isError || !data) {
		return <RelationShipError>{t('fetch_error')}</RelationShipError>;
	}

	const friends = data.pages.flatMap((page) => page.data);
	return (
		<>
			{friends.length === 0 ? (
				<RelationShipError className='text-muted-foreground'>
					{!params.search ? t('no_friends') : t('no_friends_search')}
				</RelationShipError>
			) : (
				<ul className='flex flex-col gap-2'>
					{friends.map(({ id, friend }) => (
						<li key={id}>
							<FriendCard
								friend={friend}
								badge={getFriendStatus(friend.id) || false}
								params={params}
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
					{t('no_more_friends')}
				</div>
			)}
		</>
	);
};

export default FriendsData;
