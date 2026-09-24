import { useCallback, useLayoutEffect, useRef } from 'react';

interface UseChatScrollOptions {
	messageCount: number;
}

interface ScrollSnapshot {
	scrollHeight: number;
	scrollTop: number;
}

interface UseChatScrollOptions {
	messageCount: number;
	lastMessageSenderId?: string;
	currentUserId?: string | null;
}

interface ScrollSnapshot {
	scrollHeight: number;
	scrollTop: number;
}

const NEAR_BOTTOM_THRESHOLD = 200;

export const useChatScroll = ({
	messageCount,
	lastMessageSenderId,
	currentUserId,
}: UseChatScrollOptions) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const isInitialLoad = useRef<boolean>(true);
	const pendingSnapshotRef = useRef<ScrollSnapshot | null>(null);

	const snapshotScroll = useCallback(() => {
		const container = containerRef.current;
		if (!container) return;

		pendingSnapshotRef.current = {
			scrollHeight: container.scrollHeight,
			scrollTop: container.scrollTop,
		};
	}, []);

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

	return { containerRef, isInitialLoad, snapshotScroll };
};
