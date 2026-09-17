'use client';

import { useEffect } from 'react';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/libs/utils';
import { fetchPosts } from '../api/posts';
import PostCard from './post-card';

type PostsPage = Awaited<ReturnType<typeof fetchPosts>>;

interface PostListProps {
	query: UseInfiniteQueryResult<InfiniteData<PostsPage>>;
	emptyMessage: string;
	errorMessage: string;
	className?: string;
}

export default function PostList({
	query,
	emptyMessage,
	errorMessage,
	className,
}: PostListProps) {
	const { ref, inView } = useInView({ rootMargin: '0px 0px 100px 0px' });
	const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
		query;

	useEffect(() => {
		if (!hasNextPage) return;
		if (!inView) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) {
		return (
			<div className={cn('flex justify-center py-10', className)}>
				<Spinner className='size-6' />
			</div>
		);
	}

	if (isError) {
		return (
			<p className={cn('py-10 text-center text-muted-foreground', className)}>
				{errorMessage}
			</p>
		);
	}

	const posts = data?.pages.flatMap((page) => page.data.data) ?? [];

	if (posts.length === 0) {
		return (
			<p className={cn('py-10 text-center text-muted-foreground', className)}>
				{emptyMessage}
			</p>
		);
	}

	return (
		<div className={className}>
			<ul className='divide-y divide-border'>
				{posts.map((post) => (
					<li key={post.id}>
						<PostCard post={post} />
					</li>
				))}
			</ul>
			{hasNextPage && (
				<div ref={ref} className='flex justify-center py-4'>
					{isFetchingNextPage && <Spinner className='size-6' />}
				</div>
			)}
		</div>
	);
}
