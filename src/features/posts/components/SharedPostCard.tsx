'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/libs/utils';
import { BaseUser } from '@/features/user/type';
import { MediaModal } from '@/components/ui/media-modal';
import PostContent from './post-content';
import { PostAuthorHeader } from './PostAuthorHeader';
import I18nLink from '@/modules/i18n/components/I18nLink';
import {
	AvatarProfile,
	AvatarProfileLink,
} from '@/features/user/components/Avatar/AvatarProfile';
import { Post } from '../types/post';

export interface SharedPostCardProps {
	post: Pick<Post, 'id' | 'content' | 'imageUrl' | 'author' | 'createdAt'>;
	className?: string;
}

export function SharedPostCard({ post, className }: SharedPostCardProps) {
	const t = useTranslations('posts.card');
	const authorHref = { username: `@${post.author.username}` };

	return (
		<article
			className={cn(
				'relative my-1.5 grid grid-cols-[auto_1fr] gap-x-2.5 rounded-xl border border-border bg-card/60 p-3 text-card-foreground shadow-sm transition-colors hover:bg-card/90 overflow-hidden',
				className,
			)}>
			<I18nLink
				href='userNamePostsId'
				hrefParams={{ ...authorHref, id: post.id }}
				aria-label={t('open_post')}
				className='absolute inset-0 z-0'
			/>
			<AvatarProfileLink
				username={post.author.username}
				avatar={{
					size: 'md', // or 'sm' for chat
					img: {
						src: post.author.avatarUrl ?? '',
						alt: post.author.displayName,
					},
				}}
			/>
			<div className='flex min-w-0 flex-col gap-1'>
				<PostAuthorHeader
					author={post.author}
					createdAt={post.createdAt}
					className='text-xs'
				/>
				{post.content && (
					<PostContent
						content={post.content}
						isDetailView={false}
						// className='text-xs line-clamp-4'
					/>
				)}
				{post.imageUrl && (
					<div className='relative z-10 mt-1'>
						<MediaModal
							src={post.imageUrl}
							alt={t('image_alt', { username: post.author.username })}
							thumbnailClassName='mt-2 w-full h-auto aspect-square overflow-hidden rounded-2xl border border-border'
							modalFit='contain'
							modalClassName='min-h-[min(1500px,80vh)] aspect-square'
						/>
					</div>
				)}
			</div>
		</article>
	);
}
