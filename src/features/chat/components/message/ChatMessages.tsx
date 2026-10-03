'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { useChatMessages } from '../../hooks/message/useChatMessages';
import { useChatScroll } from '../../hooks/useChatScroll';
import { useGroupedMessages } from '../../hooks/message/useGroupedMessages';
import { LoadingList } from '@/components/ui/loading-list';
import { Error } from '@/components/ui/error';
import { Spinner } from '@/components/ui/spinner';
import { ChatMessageGroup } from './ChatMessageGroup';
import { ChatMessageBubbleSkeleton } from './bubble/ChatMessageBubble';
import { PostChatMessage, TextChatMessage } from '../../types/message';
import { useUser } from '@/features/auth/stores/session';
import { Button } from '@/components/ui/button';

interface ChatMessagesProps {
	roomId: string;
	onEditMessage: (message: TextChatMessage | PostChatMessage) => void;
	onReplyMessage: (message: TextChatMessage | PostChatMessage) => void;
	onDeleteMessage: (messageId: string) => void;
}

const ChatMessages = ({
	roomId,
	onEditMessage,
	onDeleteMessage,
	onReplyMessage,
}: ChatMessagesProps) => {
	const t = useTranslations('chat.messages');
	const user = useUser();

	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useChatMessages({ roomId });

	const { messages, messagePerDay } = useGroupedMessages(data?.pages);
	const lastMessage = messages.length - 1 >= 0 ? messages[messages.length - 1] : null;
	const { containerRef, isInitialLoad, snapshotScroll, scrollToMessage } =
		useChatScroll({
			messageCount: messages.length,
			lastMessageSenderId:
				(lastMessage?.type === 'TEXT' && lastMessage?.sender?.id) || undefined,
			currentUserId: user?.id,
			fetchNextPage,
			hasNextPage,
		});

	const { ref: topIntersectionRef, inView } = useInView({
		threshold: 0,
		rootMargin: '100px 0px 0px 0px',
	});

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage && !isInitialLoad.current) {
			snapshotScroll();
			fetchNextPage();
		}
	}, [
		inView,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		isInitialLoad,
		snapshotScroll,
	]);

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
		<div
			ref={containerRef}
			className='flex flex-1 flex-col overflow-y-auto overflow-x-clip'>
			<div
				ref={topIntersectionRef}
				className='flex items-center justify-center h-10 shrink-0 mt-auto'>
				{isFetchingNextPage && <Spinner className='size-6' />}
				{!hasNextPage && (
					<span className='text-xs text-muted-foreground'>
						{t('no_more_messages')}
					</span>
				)}
			</div>
			<div className='flex flex-col gap-4 min-w-0 '>
				{Object.entries(messagePerDay).map(([date, dayMessages]) => (
					<ChatMessageGroup
						key={date}
						date={date}
						dayMessages={dayMessages}
						onEdit={onEditMessage}
						onDelete={onDeleteMessage}
						onReply={onReplyMessage}
					/>
				))}
			</div>
			<Button
				onClick={() => scrollToMessage('f4dd4b04-a0e6-4855-bdef-9958edb6717c')}>
				Scroll to message 1
			</Button>
			<Button
				onClick={() => scrollToMessage('a128c896-4efd-47bc-979a-698f55c21593')}>
				Scroll to message 1
			</Button>
		</div>
	);
};

export default ChatMessages;
