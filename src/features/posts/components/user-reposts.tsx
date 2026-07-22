'use client';

import { useInView } from 'react-intersection-observer';
import { useUserReposts } from '../hook/useUserReposts';
import { useEffect } from 'react';
import PostCard from './post-card';
import { Spinner } from '@/components/ui/spinner';

interface UserRepostsProps {
	username: string;
}

export default function UserReposts({ username }: UserRepostsProps) {
	const { ref, inView } = useInView({
		rootMargin: '0px 0px 100px 0px',
	});
	const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useUserReposts(username);
	useEffect(() => {
		if (!hasNextPage) return;
		if (!inView) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) return 'Loading';
	if (isError) return 'Error loading reposts';
	if (!data || data.pages.length === 0) return 'No reposts yet';
	const reposts = data.pages.flatMap((page) => page.data.data);

	return (
		<>
			<ul className='max-w-xl mx-auto px-4 py-8 list-none'>
				{reposts.map((r) => (
					<li key={r.id}>
						<PostCard post={r} hideRepostBanner />
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
