'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import { SearchInput } from '@/components/ui/search-param-input';
import { UsersFeedData } from '@/features/user/components/UsersFeedData';
import { BaseUser } from '@/features/user/type';
import ChatUserCard from '../../ChatUserCard';
import { useTranslations } from 'next-intl';

interface ChatUsersSearchProps {
	selectedUsers: BaseUser[];
	onUserSelect: (user: BaseUser) => void;
}

const ChatUsersSearch = memo(({ selectedUsers, onUserSelect }: ChatUsersSearchProps) => {
	const t = useTranslations('chat.rooms.create');
	const [search, setSearch] = useState('');

	const selectedUserIds = useMemo(
		() => new Set(selectedUsers.map(({ id }) => id)),
		[selectedUsers],
	);

	const isSelected = useCallback(
		(userId: string) => selectedUserIds.has(userId),
		[selectedUserIds],
	);

	const params = useMemo(
		() =>
			({
				feedParams: {
					feed: 'friends',
				},
				search,
				orderBy: 'username-asc',
			}) as const,
		[search],
	);

	const extraCardProps = useMemo(
		() => ({
			onClick: onUserSelect,
			isSelectedFn: isSelected,
		}),
		[onUserSelect, isSelected],
	);

	return (
		<section className='flex min-h-0 flex-col gap-2'>
			<SearchInput
				onValueChange={setSearch}
				placeholder={t('search_placeholder')}
				className='py-5'
			/>

			<div className='overflow-y-auto no-scrollbar'>
				<UsersFeedData
					params={params}
					className='gap-0'
					CardComponent={ChatUserCard}
					extraCardProps={extraCardProps}
				/>
			</div>
		</section>
	);
});

ChatUsersSearch.displayName = 'ChatUsersSearch';
export default ChatUsersSearch;
