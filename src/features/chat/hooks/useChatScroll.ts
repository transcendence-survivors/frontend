import {
	FetchNextPageOptions,
	InfiniteData,
	InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

interface UseChatScrollOptions {
	messageCount: number;
}

interface ScrollSnapshot {
	scrollHeight: number;
	scrollTop: number;
}

interface UseChatScrollOptions<TData = unknown, TError = unknown> {
	messageCount: number;
	lastMessageSenderId?: string;
	currentUserId?: string | null;
	hasNextPage?: boolean;
	fetchNextPage?: (
		options?: FetchNextPageOptions,
	) => Promise<InfiniteQueryObserverResult<InfiniteData<TData>, TError>>;
}

interface ScrollSnapshot {
	scrollHeight: number;
	scrollTop: number;
}

const NEAR_BOTTOM_THRESHOLD = 600;

export const useChatScroll = ({
	messageCount,
	lastMessageSenderId,
	currentUserId,
	hasNextPage,
	fetchNextPage,
}: UseChatScrollOptions) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const isInitialLoad = useRef<boolean>(true);
	const pendingSnapshotRef = useRef<ScrollSnapshot | null>(null);
	const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null);

	const snapshotScroll = useCallback(() => {
		const container = containerRef.current;
		if (!container) return;

		pendingSnapshotRef.current = {
			scrollHeight: container.scrollHeight,
			scrollTop: container.scrollTop,
		};
	}, []);

	const scrollToMessage = useCallback(
		async (messageId: string): Promise<boolean> => {
			const targetId = `message-${messageId}`;

			const findAndScroll = (): HTMLElement | null => {
				const el = document.getElementById(targetId);

				if (el) {
					el.scrollIntoView({ behavior: 'smooth', block: 'center' });
					setHighlightedMessageId(messageId);
					setTimeout(() => {
						setHighlightedMessageId((current) =>
							current === messageId ? null : current,
						);
					}, 2500);
				}
				return el;
			};

			// 1. Tente de trouver le message s'il est déjà affiché dans le DOM
			if (findAndScroll()) {
				return true;
			}

			// 2. Sinon, fetch page par page
			let canFetch = hasNextPage;

			while (canFetch && fetchNextPage) {
				snapshotScroll();

				const result = await fetchNextPage();

				await new Promise((resolve) => setTimeout(resolve, 50));

				if (findAndScroll()) {
					return true;
				}

				canFetch = Boolean(result.hasNextPage);
			}

			return false;
		},
		[hasNextPage, fetchNextPage, snapshotScroll],
	);

	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container || messageCount === 0) return;

		if (isInitialLoad.current) {
			container.scrollTop = container.scrollHeight;
			isInitialLoad.current = false;
			return;
		}

		if (pendingSnapshotRef.current) {
			const { scrollHeight: oldScrollHeight, scrollTop: oldScrollTop } =
				pendingSnapshotRef.current;

			const heightDifference = container.scrollHeight - oldScrollHeight;
			if (heightDifference > 0) {
				container.scrollTop = oldScrollTop + heightDifference;
			}

			pendingSnapshotRef.current = null;
			return;
		}

		const isOwnMessage =
			Boolean(lastMessageSenderId) &&
			Boolean(currentUserId) &&
			lastMessageSenderId === currentUserId;

		const isNearBottom =
			container.scrollHeight - container.scrollTop - container.clientHeight <
			NEAR_BOTTOM_THRESHOLD;

		if (isOwnMessage || isNearBottom) {
			container.scrollTo({
				top: container.scrollHeight,
				behavior: isOwnMessage ? 'auto' : 'smooth',
			});
		}
	}, [messageCount, lastMessageSenderId, currentUserId]);

	return { containerRef, isInitialLoad, snapshotScroll, scrollToMessage };
};
