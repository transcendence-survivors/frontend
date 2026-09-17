'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface PostContentProps {
	content?: string;
	isDetailView?: boolean;
}

const MAX_LENGTH = 280;

export default function PostContent({ content, isDetailView }: PostContentProps) {
	const t = useTranslations('posts.card');
	const [expanded, setExpanded] = useState(false);

	if (!content) return null;

	const isLong = content.length > MAX_LENGTH;
	const shouldTruncate = !isDetailView && isLong && !expanded;
	const displayContent = shouldTruncate
		? `${content.slice(0, MAX_LENGTH)}...`
		: content;

	return (
		<p
			className={`w-full min-w-0 whitespace-pre-wrap [overflow-wrap:anywhere] ${isDetailView ? 'text-base' : 'text-sm'}`}>
			{displayContent}
			{!isDetailView && isLong && (
				<button
					type='button'
					className='relative z-10 block text-primary mt-1 p-0 hover:underline focus:outline-none focus-visible:underline'
					onClick={() => setExpanded((v) => !v)}>
					{expanded ? t('see_less') : t('see_more')}
				</button>
			)}
		</p>
	);
}
