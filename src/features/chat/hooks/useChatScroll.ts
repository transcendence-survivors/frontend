import { useCallback, useLayoutEffect, useRef } from 'react';

interface UseChatScrollOptions {
	messageCount: number;
}

interface ScrollSnapshot {
	scrollHeight: number;
	scrollTop: number;
}

export const useChatScroll = ({ messageCount }: UseChatScrollOptions) => {
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
		}
	}, [messageCount]);

	return { containerRef, isInitialLoad, snapshotScroll };
};
