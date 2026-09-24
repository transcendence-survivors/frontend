'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { BaseUser } from '@/features/user/type';
import ChatUserFeedData from './ChatUserFeedData';
import { SearchInput } from '@/components/ui/search-param-input';

interface ChatMemberAddUsersSearchProps {
	selectedUsers: BaseUser[];
	onUserSelect: (user: BaseUser) => void;
}

export const ChatMembersAddUsersSearch = ({
	selectedUsers,
	onUserSelect,
}: ChatMemberAddUsersSearchProps) => {
	const t = useTranslations('chat.members.dialogs.add');
	const [search, setSearch] = useState('');

	const selectedUserIds = useMemo(
		() => new Set(selectedUsers.map(({ id }) => id)),
		[selectedUsers],
	);

	const isSelectedFn = useCallback(
		(userId: string) => selectedUserIds.has(userId),
		[selectedUserIds],
	);

	return (
		<section className='flex min-h-0 flex-col gap-2'>
			<SearchInput
				onValueChange={setSearch}
				placeholder={t('search_placeholder')}
				className='py-5'
			/>

			<div className='overflow-y-auto no-scrollbar'>
				<ChatUserFeedData
					search={search}
					isSelectedFn={isSelectedFn}
					onUserSelect={onUserSelect}
				/>
			</div>
		</section>
	);
};

export default ChatMembersAddUsersSearch;
