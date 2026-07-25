'use client';

import { useEffect } from 'react';
import { useUserLikes } from '../hook/useUserLikes';
import PostCard from './post-card';
import { Spinner } from '@/components/ui/spinner';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';

interface UserLikesProps {
	username: string;
}

export default function UserLikes({ username }: UserLikesProps) {
	const t = useTranslations('posts.likes');
	const { ref, inView } = useInView({
		rootMargin: '0px 0px 100px 0px',
	});
	const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useUserLikes(username);

	useEffect(() => {
		if (!hasNextPage) return;
		if (!inView) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) return t('loading');
	if (isError) return t('fetch_error');
	if (!data || data.pages.length === 0) return t('no_likes');
	const likes = data.pages.flatMap((page) => page.data.data);

	return (
		<>
			<ul className='max-w-xl mx-auto px-4 py-8 list-none'>
				{likes.map((p) => (
					<li key={p.id}>
						<PostCard post={p} hideRepostBanner />
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
