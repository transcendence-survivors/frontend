import { Repeat2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { MediaModal } from '@/components/ui/media-modal';
import { AvatarProfile } from '@/features/user/components/Avatar/AvatarProfile';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { cn } from '@/libs/utils';
import { Post } from '../types/post';
import PostHeader from './post-header';
import PostContent from './post-content';
import PostFooter from './post-footer';
import QuotedPost from './quoted-post';

interface PostCardProps {
	post: Post;
	isDetailView?: boolean;
}

export default function PostCard({ post, isDetailView }: PostCardProps) {
	const t = useTranslations('posts.card');
	const repostedPost = !post.content && !post.imageUrl ? post.quotedPost : undefined;
	const shownPost = repostedPost ?? post;
	const authorHref = { username: `@${shownPost.author.username}` };

	return (
		<article
			className={cn(
				'relative grid grid-cols-[auto_1fr] gap-x-3 px-4 py-3 bg-background',
				!isDetailView && 'transition-colors hover:bg-muted/40',
			)}>
			{!isDetailView && (
				<I18nLink
					href='userNamePostsId'
					hrefParams={{ ...authorHref, id: shownPost.id }}
					aria-label={t('open_post')}
					className='absolute inset-0 z-0'
				/>
			)}

			{repostedPost && (
				<>
					<Repeat2 className='size-4 mb-1 justify-self-end text-muted-foreground' />
					<p className='mb-1 text-xs font-semibold text-muted-foreground'>
						{t('reposted_by', { displayName: post.author.displayName })}
					</p>
				</>
			)}

			<I18nLink
				href='userName'
				hrefParams={authorHref}
				className='relative z-10 h-fit'>
				<AvatarProfile
					size='md'
					img={{
						src: shownPost.author.avatarUrl ?? '',
						alt: shownPost.author.displayName,
					}}
				/>
			</I18nLink>

			<div className='flex min-w-0 flex-col gap-1'>
				<PostHeader post={shownPost} isDetailView={isDetailView} />

				{shownPost.parent && shownPost.parentPostId && (
					<p className='text-sm text-muted-foreground'>
						{t('replying_to')}{' '}
						<I18nLink
							href='userNamePostsId'
							hrefParams={{
								username: `@${shownPost.parent.author.username}`,
								id: shownPost.parentPostId,
							}}
							className='relative z-10 text-primary hover:underline'>
							@{shownPost.parent.author.username}
						</I18nLink>
					</p>
				)}

				<PostContent content={shownPost.content} isDetailView={isDetailView} />

				{shownPost.imageUrl && (
					<MediaModal
						src={shownPost.imageUrl}
						alt={t('image_alt', { username: shownPost.author.username })}
						thumbnailClassName='mt-2 w-full h-auto aspect-square overflow-hidden rounded-2xl border border-border'
						modalFit='contain'
						modalClassName='min-h-[min(1500px,80vh)] aspect-square'
					/>
				)}

				{shownPost.quotedPost && <QuotedPost post={shownPost.quotedPost} />}

				<PostFooter post={shownPost} />
			</div>
		</article>
	);
}
