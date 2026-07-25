'use client';

import { useInView } from 'react-intersection-observer';
import { useUserComments } from '../hook/useUserComments';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import PostCard from './post-card';
import { useTranslations } from 'next-intl';

interface UserCommentsProps {
	username: string;
}

export default function UserComments({ username }: UserCommentsProps) {
	const t = useTranslations('posts.comments');
	const { ref, inView } = useInView({
		rootMargin: '0px 0px 100px 0px',
	});
	const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useUserComments(username);
	useEffect(() => {
		if (!hasNextPage) return;
		if (!inView) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) return t('loading');
	if (isError) return t('fetch_error');
	if (!data || data.pages.length === 0) return t('no_comments');
	const comments = data.pages.flatMap((page) => page.data.data);

	return (
		<>
			<ul className='max-w-xl mx-auto px-4 py-8 list-none'>
				{comments.map((c) => (
					<li key={c.id}>
						<PostCard post={c} />
					</li>
				))}
			</ul>
			{hasNextPage && (
				<div ref={ref} className='flex justify-center py-4'>
					{isFetchingNextPage && <Spinner className='size-6' />}
				</div>
			)}
		</>
	);
}
