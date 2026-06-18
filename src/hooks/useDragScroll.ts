import { useRef, useState, useEffect, useCallback } from 'react';

interface UseDragScrollProps {
	wheelMultiplier?: number;
	dragMultiplier?: number;
}

interface DragScrollState {
	isDragging: boolean;
	canScrollLeft: boolean;
	canScrollRight: boolean;
}

export const useDragScroll = ({
	wheelMultiplier = 0.35,
	dragMultiplier = 1.0,
}: UseDragScrollProps = {}) => {
	const ref = useRef<HTMLElement | null>(null);
	const config = useRef({ wheelMultiplier, dragMultiplier });
	const [state, setState] = useState<DragScrollState>({
		isDragging: false,
		canScrollLeft: false,
		canScrollRight: false,
	});
	const dragInfo = useRef({
		startX: 0,
		scrollLeft: 0,
		isMoved: false,
	});

	useEffect(() => {
		config.current = { wheelMultiplier, dragMultiplier };
	}, [wheelMultiplier, dragMultiplier]);

	const checkScrollBounds = useCallback(() => {
		const el = ref.current;
		if (!el) return;

		const { scrollLeft, scrollWidth, clientWidth } = el;
		const left = scrollLeft > 2;
		const right = scrollLeft < scrollWidth - clientWidth - 2;

		setState((prev) => {
			if (prev.canScrollLeft === left && prev.canScrollRight === right) return prev;
			return { ...prev, canScrollLeft: left, canScrollRight: right };
		});
	}, []);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const handleWheel = (e: WheelEvent) => {
			if (e.deltaY !== 0) {
				e.preventDefault();
				el.scrollLeft += e.deltaY * config.current.wheelMultiplier;
			}
		};

		const handleGlobalMouseMove = (e: MouseEvent) => {
			if (!state.isDragging) return;
			const x = e.pageX - el.offsetLeft;
			const walk = (x - dragInfo.current.startX) * config.current.dragMultiplier;

			if (Math.abs(walk) > 5) {
				dragInfo.current.isMoved = true;
			}

			el.scrollLeft = dragInfo.current.scrollLeft - walk;
			checkScrollBounds();
		};

		const handleGlobalMouseUp = () => {
			setState((prev) => ({ ...prev, isDragging: false }));
		};

		checkScrollBounds();

		window.addEventListener('resize', checkScrollBounds);
		el.addEventListener('scroll', checkScrollBounds);
		el.addEventListener('wheel', handleWheel, { passive: false });
		if (state.isDragging) {
			window.addEventListener('mousemove', handleGlobalMouseMove);
			window.addEventListener('mouseup', handleGlobalMouseUp);
			document.body.style.cursor = 'grabbing';
			document.body.style.userSelect = 'none';
		}
		return () => {
			el.removeEventListener('scroll', checkScrollBounds);
			window.removeEventListener('resize', checkScrollBounds);
			el.removeEventListener('wheel', handleWheel);
			window.removeEventListener('mousemove', handleGlobalMouseMove);
			window.removeEventListener('mouseup', handleGlobalMouseUp);
			document.body.style.cursor = '';
			document.body.style.userSelect = '';
		};
	}, [state.isDragging, checkScrollBounds]);

	const onMouseDown = useCallback((e: React.MouseEvent) => {
		if (!ref.current) return;

		setState((prev) => ({ ...prev, isDragging: true }));
		dragInfo.current = {
			startX: e.pageX - ref.current.offsetLeft,
			scrollLeft: ref.current.scrollLeft,
			isMoved: false,
		};
	}, []);

	const handleLinkClick = useCallback((e: React.MouseEvent) => {
		if (!dragInfo.current.isMoved) return;
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const preventNativeDrag = useCallback((e: React.DragEvent) => {
		e.preventDefault();
	}, []);

	return {
		ref,
		isDragging: state.isDragging,
		canScrollLeft: state.canScrollLeft,
		canScrollRight: state.canScrollRight,
		onMouseDown,
		handleLinkClick,
		preventNativeDrag,
	};
};
