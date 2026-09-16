'use client';

import { useTranslations } from 'next-intl';
import { useUserLikes } from '../hook/useUserLikes';
import PostList from './post-list';

interface UserLikesProps {
	username: string;
}

export default function UserLikes({ username }: UserLikesProps) {
	const t = useTranslations('posts.likes');
	const query = useUserLikes(username);

	return (
		<PostList
			query={query}
			emptyMessage={t('no_likes')}
			errorMessage={t('fetch_error')}
			className='mx-auto max-w-2xl'
		/>
	);
}
