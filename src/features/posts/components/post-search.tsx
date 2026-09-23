'use client';

import { useQueryState } from 'nuqs';
import Posts from './posts';

export default function PostSearch() {
	const [search] = useQueryState('search', { defaultValue: '' });

	return <Posts search={search} feed='all-not-blocked' />;
}
