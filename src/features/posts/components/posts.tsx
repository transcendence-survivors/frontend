'use client';

import { useTranslations } from 'next-intl';
import { usePosts } from '../hook/usePosts';
import PostList from './post-list';

interface PostsProps {
	parentPostId?: string;
}

export default function Posts({ parentPostId }: PostsProps) {
	const t = useTranslations('posts');
	const query = usePosts(parentPostId);

	return (
		<PostList
			query={query}
			emptyMessage={parentPostId ? t('comments.no_comments') : t('list.no_posts')}
			errorMessage={
				parentPostId ? t('comments.fetch_error') : t('list.fetch_error')
			}
		/>
	);
}
