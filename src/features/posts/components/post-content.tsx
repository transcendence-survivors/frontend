'use client';

import { useState } from 'react';

interface PostContentProps {
	content?: string;
	isDetailView?: boolean;
}

const MAX_LENGTH = 280;

export default function PostContent({ content, isDetailView }: PostContentProps) {
	const [expanded, setExpanded] = useState(false);

	if (!content) return null;

	const isLong = content.length > MAX_LENGTH;
	const shouldTruncate = !isDetailView && isLong && !expanded;
	const displayContent = shouldTruncate
		? `${content.slice(0, MAX_LENGTH)}...`
		: content;

	return (
		<p className='pl-1 z-10 w-full min-w-0 [overflow-wrap:anywhere]'>
			{displayContent}
			{!isDetailView && isLong && (
				<button
					type='button'
					className='block text-primary mt-1 p-0 hover:underline focus:outline-none focus-visible:underline'
					onClick={() => setExpanded((v) => !v)}>
					{expanded ? 'See less' : 'See more'}
				</button>
			)}
		</p>
	);
}
