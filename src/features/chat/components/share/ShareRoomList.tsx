'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { Error } from '@/components/ui/error';
import { Spinner } from '@/components/ui/spinner';
import { LoadingList } from '@/components/ui/loading-list';
import { useChatRooms, UseChatRoomsParams } from '../../hooks/room/useChatRooms';
import { ShareRoomItem } from './ShareRoomItem';
import { ChatRoomCardSkeleton } from '../room/ChatRoomCard';

interface ShareRoomListProps {
	params: UseChatRoomsParams;
	selectedRoomIds: string[];
	onToggleRoom: (roomId: string) => void;
}

export const ShareRoomList = ({
	params,
	selectedRoomIds,
	onToggleRoom,
}: ShareRoomListProps) => {
	const t = useTranslations('chat');
	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useChatRooms(params);

	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: '0px 0px 100px 0px',
	});

	useEffect(() => {
		if (!inView || !hasNextPage || isFetchingNextPage) return;
		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) {
		return (
			<div className='h-[200px] overflow-y-auto border rounded-md p-1'>
				<LoadingList
					numberOfSkeletons={4}
					SkeletonComponent={ChatRoomCardSkeleton}
				/>
			</div>
		);
	}

	if (isError || !data) {
		return (
			<div className='h-[200px] border rounded-md p-2 flex items-center justify-center'>
				<Error>{t('rooms.fetch_error')}</Error>
			</div>
		);
	}

	const rooms = data.pages.flatMap((page) => page.data);
	if (rooms.length === 0) {
		return (
			<div className='h-[200px] border rounded-md p-4 text-center text-xs text-muted-foreground flex items-center justify-center'>
				{params.search
					? t('rooms.no_chat_rooms_search')
					: t('rooms.no_chat_rooms')}
			</div>
		);
	}

	return (
		<div className='h-[200px] overflow-y-auto border rounded-md p-1 scrollbar-thin scrollbar-thumb-muted-foreground/20'>
			<ul className='flex flex-col gap-1'>
				{rooms.map((room) => (
					<ShareRoomItem
						key={room.id}
						room={room}
						isSelected={selectedRoomIds.includes(room.id)}
						onToggle={onToggleRoom}
					/>
				))}
			</ul>

			{hasNextPage && (
				<div ref={ref} className='flex justify-center py-2'>
					{isFetchingNextPage && <Spinner className='size-4' />}
				</div>
			)}
		</div>
	);
};
