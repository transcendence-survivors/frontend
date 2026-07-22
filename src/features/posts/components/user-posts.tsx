'use client';

import { useInView } from 'react-intersection-observer';
import { useUserPosts } from '../hook/useUserPosts';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import PostCard from './post-card';

interface UserPostsProps {
	username: string;
}

export default function UserPosts({ username }: UserPostsProps) {
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

	if (isLoading) return 'Loading';
	if (isError) return 'Error loading posts';
	if (!data || data.pages.length === 0) return 'Pas de posts';
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
