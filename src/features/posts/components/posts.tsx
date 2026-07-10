'use client';

import { useInView } from 'react-intersection-observer';
import { usePosts } from '../hook/usePosts';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import PostCard from './post-card';
import { useRouter } from '@/modules/i18n/utils/navigation';
import { resolveHref } from '@/modules/i18n/components/I18nLink';
import { getPath } from '@/modules/i18n/utils/routing';

export default function Posts() {
	const router = useRouter();

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
			<div className='max-w-xl mx-auto px-4 py-8 list-none'>
				{posts.map((p) => (
					<article
						onClick={() =>
							router.push(
								resolveHref(getPath('userNamePost'), {
									username: `@${p.author.username}`,
									id: p.id,
								}),
							)
						}
						key={p.id}
						className='flex flex-col items-start gap-2 p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer'>
						<PostCard post={p} />
					</article>
				))}
			</div>
			{hasNextPage && (
				<div ref={ref} className='flex justify-center py-4'>
					{isFetchingNextPage && <Spinner className='size-6' />}
				</div>
			)}
		</>
	);
}
