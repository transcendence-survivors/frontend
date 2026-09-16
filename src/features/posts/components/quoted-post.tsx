import { useTranslations } from 'next-intl';
import DisplayDate from '@/components/ui/date';
import { AvatarProfile } from '@/features/user/components/Avatar/AvatarProfile';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { Post } from '../types/post';

interface QuotedPostProps {
	post: Post;
}

export default function QuotedPost({ post }: QuotedPostProps) {
	const t = useTranslations('posts.card');

	return (
		<I18nLink
			href='userNamePostsId'
			hrefParams={{ username: `@${post.author.username}`, id: post.id }}
			className='relative z-10 mt-2 block overflow-hidden rounded-2xl border border-border transition-colors hover:bg-muted/40'>
			<div className='flex flex-col gap-1 p-3'>
				<div className='flex items-center gap-1 text-sm'>
					<AvatarProfile
						size='xs'
						className='mr-1'
						img={{
							src: post.author.avatarUrl ?? '',
							alt: post.author.displayName,
						}}
					/>
					<span className='truncate font-semibold'>
						{post.author.displayName}
					</span>
					<span className='truncate text-muted-foreground'>
						@{post.author.username}
					</span>
					<span className='text-muted-foreground'>·</span>
					<DisplayDate
						date={new Date(post.createdAt)}
						className='shrink-0 text-muted-foreground'
					/>
				</div>
				{post.content && (
					<p className='line-clamp-4 text-sm [overflow-wrap:anywhere]'>
						{post.content}
					</p>
				)}
			</div>
			{post.imageUrl && (
				<img
					src={post.imageUrl}
					alt={t('image_alt', { username: post.author.username })}
					className='aspect-square max-h-80 w-full object-cover'
				/>
			)}
		</I18nLink>
	);
}
