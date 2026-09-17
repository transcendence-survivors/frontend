'use client';

import { useTranslations } from 'next-intl';
import { useUserPosts } from '../hook/useUserPosts';
import PostList from './post-list';

interface UserPostsProps {
	username: string;
}

export default function UserPosts({ username }: UserPostsProps) {
	const t = useTranslations('posts.list');
	const query = useUserPosts(username);

	return (
		<PostList
			query={query}
			emptyMessage={t('no_posts')}
			errorMessage={t('fetch_error')}
			className='mx-auto max-w-2xl'
		/>
	);
}
