'use client';

import { useTranslations } from 'next-intl';
import { useUserReposts } from '../hook/useUserReposts';
import PostList from './post-list';

interface UserRepostsProps {
	username: string;
}

export default function UserReposts({ username }: UserRepostsProps) {
	const t = useTranslations('posts.reposts');
	const query = useUserReposts(username);

	return (
		<PostList
			query={query}
			emptyMessage={t('no_reposts')}
			errorMessage={t('fetch_error')}
			className='mx-auto max-w-2xl'
		/>
	);
}
