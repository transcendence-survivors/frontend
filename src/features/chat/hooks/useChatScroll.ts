import { useLayoutEffect, useRef } from 'react';

interface UseChatScrollOptions {
	messageCount: number;
}

export const useChatScroll = ({ messageCount }: UseChatScrollOptions) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const prevScrollHeightRef = useRef<number>(0);
	const isInitialLoad = useRef(true);

	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container || messageCount === 0) return;

		if (isInitialLoad.current) {
			container.scrollTop = container.scrollHeight;
			isInitialLoad.current = false;
		} else if (prevScrollHeightRef.current > 0) {
			const heightDifference = container.scrollHeight - prevScrollHeightRef.current;
			container.scrollTop += heightDifference;
		}

		prevScrollHeightRef.current = container.scrollHeight;
	}, [messageCount]);

	return { containerRef, isInitialLoad };
};
