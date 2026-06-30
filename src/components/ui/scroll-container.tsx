'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/libs/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollContainerProps extends React.HTMLAttributes<HTMLElement> {
	children: React.ReactNode;
	isDragging: boolean;
	canScrollLeft: boolean;
	canScrollRight: boolean;
	ulClassName?: string;
	onMouseDown?: React.MouseEventHandler<HTMLElement>;
	onMouseMove?: React.MouseEventHandler<HTMLElement>;
	onDragStart?: React.DragEventHandler<HTMLElement>;
}

const ScrollContainer = forwardRef<HTMLElement, ScrollContainerProps>(
	(
		{
			children,
			className,
			ulClassName,
			isDragging,
			canScrollLeft,
			canScrollRight,
			onMouseDown,
			onDragStart,
			...props
		},
		ref,
	) => {
		return (
			<div className='relative w-full'>
				<div
					className={`
                        absolute left-0 bottom-0 top-0 z-10 flex items-center pr-12 pointer-events-none \
                        bg-linear-to-r from-background via-background/80 to-transparent \
                        transition-opacity duration-300 \
                        ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}>
					<ChevronLeft className='w-5 h-5 text-muted-foreground animate-pulse ml-2' />
				</div>

				<nav
					ref={ref}
					onMouseDown={onMouseDown}
					className={cn(
						'overflow-x-auto no-scrollbar border-b border-border',
						isDragging ? 'cursor-grabbing' : 'cursor-grab',
						className,
					)}
					{...props}>
					<ul
						className={cn('flex w-max min-w-full', ulClassName)}
						onDragStart={onDragStart}>
						{children}
					</ul>
				</nav>

				<div
					className={`
						absolute right-0 bottom-0 top-0 z-10 flex items-center pl-12 pointer-events-none \
                        bg-linear-to-l from-background via-background/80 to-transparent \
                        transition-opacity duration-300 \
						${canScrollRight ? 'opacity-100' : 'opacity-0'}`}>
					<ChevronRight className='w-5 h-5 text-muted-foreground animate-pulse mr-2' />
				</div>
			</div>
		);
	},
);

ScrollContainer.displayName = 'ScrollContainer';

export { ScrollContainer };
