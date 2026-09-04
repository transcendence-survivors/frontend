'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';

import { useChatMessages } from '../../hooks/useChatMessages';
import { useChatScroll } from '../../hooks/useChatScroll';
import { useGroupedMessages } from '../../hooks/useGroupedMessages';

import { LoadingList } from '@/components/ui/loading-list';
import { Error } from '@/features/relationships/components/error';
import { Spinner } from '@/components/ui/spinner';
import { ChatMessageGroup } from './ChatMessageGroup';
import { ChatMessageBubbleSkeleton } from './bubble/ChatMessageBubble';
import { ChatMessage } from '../../types/message';

interface ChatMessagesProps {
	roomId: string;
	userId: string;
	onEditMessage: (message: ChatMessage) => void;
	onDeleteMessage: (messageId: string) => void;
	onReplyMessage: (message: ChatMessage) => void;
}

const ChatMessages = ({
	roomId,
	userId,
	onEditMessage,
	onDeleteMessage,
	onReplyMessage,
}: ChatMessagesProps) => {
	const t = useTranslations('chat.messages');

	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useChatMessages({ roomId });

	const { messages, messagePerDay } = useGroupedMessages(data?.pages);
	const { containerRef, isInitialLoad } = useChatScroll({
		messageCount: messages.length,
	});

	const { ref: topIntersectionRef, inView } = useInView({
		threshold: 0,
		rootMargin: '100px 0px 0px 0px',
	});

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage && !isInitialLoad.current) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isInitialLoad]);

	if (isLoading) {
		return (
			<LoadingList
				className='flex-1 flex-col-reverse overflow-y-auto'
				numberOfSkeletons={5}
				SkeletonComponent={ChatMessageBubbleSkeleton}
			/>
		);
	}

	if (isError || !data) {
		return <Error className='flex-1 flex-col-reverse'>{t('fetch_error')}</Error>;
	}

	if (messages.length === 0) {
		return (
			<Error className='text-muted-foreground flex-1 flex-col-reverse'>
				{t('no_messages')}
			</Error>
		);
	}

	return (
		<div ref={containerRef} className='flex flex-1 flex-col overflow-y-auto'>
			<div ref={topIntersectionRef} className='flex justify-center py-2 mt-auto'>
				{isFetchingNextPage && <Spinner className='size-6' />}
				{!hasNextPage && (
					<span className='text-xs text-muted-foreground py-2'>
						{t('no_more_messages')}
					</span>
				)}
			</div>

			<div className='flex flex-col gap-4'>
				{Object.entries(messagePerDay).map(([date, dayMessages]) => (
					<ChatMessageGroup
						key={date}
						date={date}
						dayMessages={dayMessages}
						currentUserId={userId}
						onEdit={onEditMessage}
						onDelete={onDeleteMessage}
						onReply={onReplyMessage}
					/>
				))}
			</div>
		</div>
	);
};

export default ChatMessages;
