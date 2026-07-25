'use client';

import { useInView } from 'react-intersection-observer';
import { useUserPosts } from '../hook/useUserPosts';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import PostCard from './post-card';
import { useTranslations } from 'next-intl';

interface UserPostsProps {
	username: string;
}

export default function UserPosts({ username }: UserPostsProps) {
	const t = useTranslations('posts.list');
	const { ref, inView } = useInView({
		rootMargin: '0px 0px 100px 0px',
	});
	const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useUserPosts(username);

	useEffect(() => {
		if (!hasNextPage) return;
		if (!inView) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) return t('loading');
	if (isError) return t('fetch_error');
	if (!data || data.pages.length === 0) return t('no_posts');
	const posts = data.pages.flatMap((page) => page.data.data);

	return (
		<>
			<ul className='max-w-xl mx-auto px-4 py-8 list-none'>
				{posts.map((p) => (
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
