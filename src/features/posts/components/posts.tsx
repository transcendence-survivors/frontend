'use client';

import { useInView } from 'react-intersection-observer';
import { usePosts } from '../hook/usePosts';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';

export default function Posts() {
	const { ref, inView } = useInView({
		rootMargin: '0px 0px 100px 0px',
	});
	const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
		usePosts();
	useEffect(() => {
		if (!hasNextPage) return;
		if (!inView) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) return 'Loading';
	if (isError) return 'Error loading posts';
	if (!data || data.pages.length === 0) return 'Pas de data';
	const posts = data.pages.flatMap((page) => page.data.data);

	return (
		<>
			<ul className='container mx-auto px-4 py-8'>
				{posts.map((p) => (
					<li key={p.id} className='p-4 border rounded-md'>
						<div className='font-semibold'>
							{' '}
							{p.author?.displayName ?? p.author.id}
						</div>
						<div className='text-foreground'>{p.content}</div>
						<div className='text-foreground'>
							<br />
							{new Date(p.createdAt).toLocaleString('fr-FR', {
								day: '2-digit',
								month: '2-digit',
								year: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
							})}
						</div>
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
