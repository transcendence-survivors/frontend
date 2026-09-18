import { Error } from '@/components/ui/error';
import { LoadingList } from '@/components/ui/loading-list';
import { useRoomMemberIds } from '@/features/chat/stores/roomSlice';
import { useFriends } from '@/features/relationships/friend/hooks/useFriends';
import { BaseUser } from '@/features/user/type';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
	ChatUserSearchCard,
	ChatUserSearchCardSkeleton,
} from '../../../ChatUserSearchCard';
import { Spinner } from '@/components/ui/spinner';

interface ChatUserFeedDataProps {
	search: string;
	isSelectedFn: (userId: string) => boolean;
	onUserSelect: (user: BaseUser) => void;
}

export const ChatUserFeedData = ({
	search,
	isSelectedFn,
	onUserSelect,
}: ChatUserFeedDataProps) => {
	const t = useTranslations('chat.members.dialogs.add');
	const activeRoomMemberIds = useRoomMemberIds();

	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: '0px 0px 100px 0px',
	});

	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useFriends({
			search,
			friendIds: activeRoomMemberIds,
			status: 'NOT_IN',
		});

	useEffect(() => {
		if (!inView || !hasNextPage || isFetchingNextPage) return;
		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) {
		return (
			<LoadingList
				numberOfSkeletons={6}
				SkeletonComponent={ChatUserSearchCardSkeleton}
			/>
		);
	}

	if (isError || !data) {
		return <Error>{t('fetch_error')}</Error>;
	}

	const friends = data.pages.flatMap((page) => page.data);
	if (friends.length === 0) {
		return (
			<div className='py-6 text-center text-sm text-muted-foreground'>
				{!search ? t('no_friends') : t('no_friends_found')}
			</div>
		);
	}

	return (
		<>
			<ul className='flex flex-col gap-1'>
				{friends.map(({ id, friend }) => (
					<li key={id}>
						<ChatUserSearchCard
							user={friend}
							onClick={onUserSelect}
							isSelectedFn={isSelectedFn}
						/>
					</li>
				))}
			</ul>

			{hasNextPage && (
				<div ref={ref} className='flex justify-center py-3'>
					{isFetchingNextPage && <Spinner className='size-5' />}
				</div>
			)}
		</>
	);
};

export default ChatUserFeedData;
