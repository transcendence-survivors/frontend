'use client';

import { useTranslations } from 'next-intl';
import { type PostFeed } from '../api/posts';
import { usePosts } from '../hook/usePosts';
import PostList from './post-list';

interface PostsProps {
	parentPostId?: string;
	search?: string;
	feed?: PostFeed;
}

export default function Posts({ parentPostId, search, feed }: PostsProps) {
	const t = useTranslations('posts');
	const query = usePosts(parentPostId, search, feed);

	return (
		<PostList
			query={query}
			emptyMessage={
				parentPostId
					? t('comments.no_comments')
					: t(search ? 'list.no_posts_search' : 'list.no_posts')
			}
			errorMessage={
				parentPostId ? t('comments.fetch_error') : t('list.fetch_error')
			}
		/>
	);
}
