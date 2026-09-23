'use client';

import { useMemo } from 'react';
import { useQueryState } from 'nuqs';
import { UsersFeedData } from './UsersFeedData';
import { UserSearchCard } from './UserSearchCard';

const UserSearch = () => {
	const [search] = useQueryState('search', { defaultValue: '' });
	const params = useMemo(
		() => ({ search, feedParams: { feed: 'all-not-blocked' as const } }),
		[search],
	);

	return <UsersFeedData params={params} CardComponent={UserSearchCard} />;
};

export { UserSearch };
