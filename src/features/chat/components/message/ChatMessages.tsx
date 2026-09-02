'use client';

import { useInView } from 'react-intersection-observer';
import { useChatMessages } from '../../hooks/useChatMessages';
import { useEffect } from 'react';
import { LoadingList } from '@/components/ui/loading-list';
import { Error } from '@/features/relationships/components/error';
import { useTranslations } from 'next-intl';
import { FriendCardSkeleton } from '@/features/relationships/friend/components/FriendCard';
import { ChatMessageBubble, ChatMessageBubbleSkeleton } from './ChatMessageBubble';
import { Spinner } from '@/components/ui/spinner';
import { useJoinChatRoom } from '../../hooks/useJoinChatRoom';
import { useUser } from '@/features/auth/stores/session';

interface ChatMessagesProps {
	roomId: string;
}

const ChatMessages = ({ roomId }: ChatMessagesProps) => {
	useJoinChatRoom(roomId);
	const user = useUser();

	const t = useTranslations('chat.messages');
	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: '100px 0px 0px 0px',
	});
	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useChatMessages({ roomId });

	useEffect(() => {
		if (!inView) return;
		if (!hasNextPage) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) {
		return (
			<LoadingList
				numberOfSkeletons={20}
				SkeletonComponent={ChatMessageBubbleSkeleton}
			/>
		);
	}
	if (isError || !data) {
		return <Error>{t('fetch_error')}</Error>;
	}

	const messages = data.pages.flatMap((page) => page.data);
	const messagePerDay = messages.reduce(
		(acc, message) => {
			const date = new Date(message.createdAt).toDateString();
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(message);
			return acc;
		},
		{} as Record<string, typeof messages>,
	);

	return (
		<>
			{hasNextPage && (
				<div ref={ref} className='flex justify-center py-4'>
					{isFetchingNextPage && <Spinner className='size-6' />}
				</div>
			)}
			{!hasNextPage && messages.length > 0 && (
				<div className='flex justify-center py-4 text-muted-foreground text-sm'>
					{t('no_more_messages')}
				</div>
			)}
			{messages.length === 0 ? (
				<Error className='text-muted-foreground'>{t('no_messages')}</Error>
			) : (
				<>
					{Object.keys(messagePerDay).map((date) => (
						<div key={date}>
							<div className='my-4 flex items-center justify-center gap-3 eyebrow'>
								<span className='h-px w-8 bg-border' />
								{date}
								<span className='h-px w-8 bg-border' />
							</div>
							<ul className='flex flex-col-reverse gap-3'>
								{messagePerDay[date].map((message, index) => (
									<li key={message.id}>
										<ChatMessageBubble
											message={message}
											isMe={user?.id === message.sender.id}
											prevUserId={
												messagePerDay[date][index + 1]?.sender.id
											}
										/>
									</li>
								))}
							</ul>
						</div>
					))}
				</>
			)}
		</>
	);
};

export default ChatMessages;
