'use client';

import { useTranslations } from 'next-intl';
import { useUserComments } from '../hook/useUserComments';
import PostList from './post-list';

interface UserCommentsProps {
	username: string;
}

export default function UserComments({ username }: UserCommentsProps) {
	const t = useTranslations('posts.comments');
	const query = useUserComments(username);

	return (
		<PostList
			query={query}
			emptyMessage={t('no_comments')}
			errorMessage={t('fetch_error')}
			className='mx-auto max-w-2xl'
		/>
	);
}
