'use client';

import { useInView } from 'react-intersection-observer';
import { usePosts } from '../hook/usePosts';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import LikeButton from '@/features/likes/components/LikeButton';
import CreatePost from './create-post';
import { ImageModal } from '@/components/ui/image-modal';

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
			<ul className='max-w-xl mx-auto px-4 py-8 list-none'>
				{posts.map((p) => (
					<li
						key={p.id}
						className='flex gap-3 p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer'>
						<Avatar>
							<AvatarImage src={p.author.avatarUrl} />
							<AvatarFallback>
								{p.author.displayName.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div className='flex-1 min-w-0'>
							<div className='flex gap-2'>
								<span className='font-semibold'>
									{' '}
									{p.author?.displayName ?? p.author.id}
								</span>
								<span className='text-sm text-muted-foreground'>
									{new Date(p.createdAt).toLocaleString('fr-FR', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
									})}
								</span>
							</div>
							<p>{p.content}</p>
							{p.imageUrl && (
								<ImageModal
									src={p.imageUrl}
									alt=''
									thumbnailClassName='mt-2 w-full h-auto aspect-square rounded-2xl border border-border'
								/>
							)}
							<LikeButton
								postId={p.id}
								likeCount={p.likeCount}
								isLiked={p.isLiked}
							/>
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
