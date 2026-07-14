import { Post } from '../types/post';
import { ImageModal } from '@/components/ui/image-modal';

import PostHeader from './post-header';
import PostFooter from './post-footer';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PostCardProps {
	post: Post;
	isDetailView?: boolean;
}

export default function PostCard({ post, isDetailView }: PostCardProps) {
	return (
		<Card
			size='sm'
			className={`relative w-full p-5 border-b  
                ${isDetailView ? 'bg-card' : 'bg-background hover:bg-card transition-colors focus-within:bg-card'}`}>
			<article>
				{!isDetailView && (
					<Button variant='ghost' className='' asChild>
						<I18nLink
							href={'userNamePostsId'}
							hrefParams={{
								username: `@${post.author.username}`,
								id: post.id,
							}}
							className='absolute inset-0 z-0 h-auto bg-transparent hover:bg-transparent focus-visible:bg-transparent'
						/>
					</Button>
				)}
				<div className='w-full flex flex-col items-start gap-2'>
					<PostHeader post={post} isDetailView={isDetailView} />
					<p className='pl-1'>{post.content}</p>
					{post.imageUrl && (
						<div className='pl-1 w-full z-10'>
							<ImageModal
								src={post.imageUrl}
								alt=''
								thumbnailClassName='px-0 mt-2 w-full h-auto aspect-square rounded-2xl border border-border'
							/>
						</div>
					)}
					<PostFooter post={post} />
				</div>
			</article>
		</Card>
	);
}
