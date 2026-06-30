import { useCallback, RefObject } from 'react';

interface UseFocusScrollProps {
	scrollContainerRef: RefObject<HTMLElement | null>;
	paddingBuffer?: number;
}

export const useFocusScroll = ({
	scrollContainerRef,
	paddingBuffer = 40,
}: UseFocusScrollProps) => {
	const onFocus = useCallback(
		(e: React.FocusEvent<HTMLElement>) => {
			const container = scrollContainerRef.current;
			if (!container) return;
			const target = e.currentTarget;

			const targetLeft = target.offsetLeft;
			const targetRight = targetLeft + target.offsetWidth;

			const containerLeft = container.scrollLeft;
			const containerRight = containerLeft + container.clientWidth;

			if (targetLeft < containerLeft + paddingBuffer) {
				container.scrollTo({
					left: targetLeft - paddingBuffer,
					behavior: 'smooth',
				});
				return;
			}
			if (targetRight > containerRight - paddingBuffer) {
				container.scrollTo({
					left: targetRight - container.clientWidth + paddingBuffer,
					behavior: 'smooth',
				});
			}
		},
		[scrollContainerRef, paddingBuffer],
	);

	return { onFocus };
};
