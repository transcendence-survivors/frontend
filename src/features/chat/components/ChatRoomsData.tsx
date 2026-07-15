'use client';

import { useTranslations } from 'next-intl';
import ChatRoomCard from './ChatRoomCard';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Error } from '@/features/relationships/components/error';
import { FriendsLoading } from '@/features/relationships/friend/components/FriendsLoading';
import { Spinner } from '@/components/ui/spinner';
import { useChatRooms, UseChatRoomsParams } from '../hooks/useChatRooms';

interface ChatRoomsDataProps extends React.HTMLAttributes<HTMLDivElement> {
	params: UseChatRoomsParams;
}

const ChatRoomsData = ({ params }: ChatRoomsDataProps) => {
	const t = useTranslations('chat.rooms');
	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: '0px 0px 100px 0px',
	});
	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useChatRooms(params);

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
		return <Error>{t('fetch_error')}</Error>;
	}

	const rooms = data.pages.flatMap((page) => page.data);
	return (
		<>
			{rooms.length === 0 ? (
				<Error className='text-muted-foreground'>
					{!params.search ? t('no_chat_rooms') : t('no_chat_rooms_search')}
				</Error>
			) : (
				<ul className='flex-1 overflow-y-auto'>
					{rooms.map((room) => (
						<li key={room.id}>
							<ChatRoomCard c={room} state={'OFFLINE'} />
						</li>
					))}
				</ul>
			)}
			{hasNextPage && (
				<div ref={ref} className='flex justify-center py-4'>
					{isFetchingNextPage && <Spinner className='size-6' />}
				</div>
			)}
			{!hasNextPage && rooms.length > 0 && (
				<div className='flex justify-center py-4 text-muted-foreground text-sm'>
					{t('no_more_chat_rooms')}
				</div>
			)}
		</>
	);
};

export default ChatRoomsData;
