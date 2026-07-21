'use client';

import { useTranslations } from 'next-intl';
import { ChatRoomCard, ChatRoomCardSkeleton } from './ChatRoomCard';
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo } from 'react';
import { Error } from '@/features/relationships/components/error';
import { Spinner } from '@/components/ui/spinner';
import { useChatRooms, UseChatRoomsParams } from '../../hooks/useChatRooms';
import { LoadingList } from '@/components/ui/loading-list';
import { usePathname } from 'next/navigation';
import { matchRoute } from '@/modules/i18n/utils/match';
import { stripLocale } from '@/modules/i18n/utils/resolve';

interface ChatRoomsDataProps extends React.HTMLAttributes<HTMLDivElement> {
	params: UseChatRoomsParams;
}

const ChatRoomsData = ({ params }: ChatRoomsDataProps) => {
	const pathname = usePathname();
	const activeRoomId = useMemo(() => {
		const params = matchRoute('chatId', stripLocale(pathname));
		return params?.id ?? null;
	}, [pathname]);

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
		return (
			<LoadingList
				numberOfSkeletons={10}
				SkeletonComponent={ChatRoomCardSkeleton}
			/>
		);
	}
	if (isError || !data) {
		return <Error>{t('fetch_error')}</Error>;
	}

	const rooms = data.pages.flatMap((page) => page.data);
	if (rooms.length === 0) {
		return (
			<Error className='text-muted-foreground'>
				{params.search ? t('no_chat_rooms_search') : t('no_chat_rooms')}
			</Error>
		);
	}
	return (
		<>
			<ul className='flex flex-col gap-0'>
				{rooms.map((room) => (
					<li key={room.id}>
						<ChatRoomCard
							room={room}
							params={params}
							isActive={room.id === activeRoomId}
						/>
					</li>
				))}
			</ul>
			{hasNextPage ? (
				<div ref={ref} className='flex justify-center py-4'>
					{isFetchingNextPage && <Spinner className='size-6' />}
				</div>
			) : (
				<div className='flex justify-center py-4 text-muted-foreground text-sm'>
					{t('no_more_chat_rooms')}
				</div>
			)}
		</>
	);
};

export default ChatRoomsData;
