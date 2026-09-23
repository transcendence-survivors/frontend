'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import PostSearch from '@/features/posts/components/post-search';
import { UserSearch } from '@/features/user/components/UserSearch';

const tabs = [
	{ key: 'users', labelKey: 'users_title' },
	{ key: 'posts', labelKey: 'posts_title' },
] as const;

export default function SearchTabs() {
	const t = useTranslations('search');
	const [tab, setTab] = useQueryState(
		'tab',
		parseAsStringLiteral(['users', 'posts']).withDefault('users'),
	);

	return (
		<>
			<ul className='flex border-b border-border'>
				{tabs.map(({ key, labelKey }) => (
					<li key={key} className='flex-1'>
						<Button
							variant='tabs'
							size='lg'
							className='w-full'
							data-active={tab === key}
							onClick={() => setTab(key)}>
							{t(labelKey)}
						</Button>
					</li>
				))}
			</ul>

			{tab === 'users' ? (
				<UserSearch />
			) : (
				<div className='border border-border divide-y divide-border'>
					<PostSearch />
				</div>
			)}
		</>
	);
}
