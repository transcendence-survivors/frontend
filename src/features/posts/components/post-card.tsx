'use client';

import { Post } from '../types/post';
import { ImageModal } from '@/components/ui/image-modal';

import PostHeader from './post-header';
import PostFooter from './post-footer';
import { resolveHref } from '@/modules/i18n/components/I18nLink';
import { useRouter } from '@/modules/i18n/utils/navigation';
import { getPath } from '@/modules/i18n/utils/routing';

interface PostCardProps {
	post: Post;
}

export default function PostCard({ post }: PostCardProps) {
	const router = useRouter();

	return (
		<article
			className='flex flex-col items-start gap-2 w-full p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer'
			onClick={() =>
				router.push(
					resolveHref(getPath('userNamePost'), {
						username: `@${post.author.username}`,
						id: post.id,
					}),
				)
			}>
			<PostHeader post={post} />

			<p className='pl-1'>{post.content}</p>
			{post.imageUrl && (
				<div className='pl-1 w-full' onClick={(e) => e.stopPropagation()}>
					<ImageModal
						src={post.imageUrl}
						alt=''
						thumbnailClassName='px-0 mt-2 w-full h-auto aspect-square rounded-2xl border border-border'
					/>
				</div>
			)}
			<PostFooter post={post} />
		</article>
	);
}
