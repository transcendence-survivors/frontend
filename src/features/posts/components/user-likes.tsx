'use client';

import { useEffect } from 'react';
import { useUserLikes } from '../hook/useUserLikes';
import PostCard from './post-card';
import { Spinner } from '@/components/ui/spinner';
import { useInView } from 'react-intersection-observer';

interface UserLikesProps {
	username: string;
}

export default function UserLikes({ username }: UserLikesProps) {
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

	if (isLoading) return 'Loading';
	if (isError) return 'Error loading likes';
	if (!data || data.pages.length === 0) return 'No likes found';
	const likes = data.pages.flatMap((page) => page.data.data);

	return (
		<>
			<ul className='max-w-xl mx-auto px-4 py-8 list-none'>
				{likes.map((p) => (
					<li key={p.id}>
						<PostCard post={p} />
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
