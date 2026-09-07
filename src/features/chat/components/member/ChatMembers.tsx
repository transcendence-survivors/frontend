'use client';

import { useState } from 'react';
import { ChatMemberCount } from './ChatMemberCount';
import { useTranslations } from 'next-intl';
import ChatMembersData from './ChatMembersData';
import { useUser } from '@/features/auth/stores/session';
import { ChatMemberOrderBy } from '../../types/member';
import { SearchInput } from '@/components/ui/search-param-input';
import { Users, ArrowUpDown } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DeepKeys } from '@/libs/types';
import { AppMessages } from '@/modules/i18n/messages/types';

interface ChatMembersSectionProps {
	roomId: string;
	className?: string;
}

const orderByOptions: {
	value: ChatMemberOrderBy;
	labelKey: DeepKeys<AppMessages['chat']['members']>;
}[] = [
	{ value: 'username-asc', labelKey: 'sort.username_asc' },
	{ value: 'username-desc', labelKey: 'sort.username_desc' },
	{ value: 'displayname-asc', labelKey: 'sort.displayname_asc' },
	{ value: 'displayname-desc', labelKey: 'sort.displayname_desc' },
	{ value: 'joined-desc', labelKey: 'sort.joined_desc' },
	{ value: 'joined-asc', labelKey: 'sort.joined_asc' },
	{ value: 'role-asc', labelKey: 'sort.role_asc' },
	{ value: 'role-desc', labelKey: 'sort.role_desc' },
] as const;

export const ChatMembers = ({ roomId, className }: ChatMembersSectionProps) => {
	const user = useUser();
	const t = useTranslations('chat.members');

	const [search, setSearch] = useState('');
	const [orderBy, setOrderBy] = useState<ChatMemberOrderBy>('username-asc');

	return (
		<div className='flex flex-col min-h-0 gap-0 w-full'>
			<div>
				<div className='p-4 border-b border-border flex items-center gap-2 font-semibold shrink-0'>
					<Users className='size-4' />
					<h2 className='text-lg font-semibold flex items-center gap-2 truncate'>
						<ChatMemberCount roomId={roomId} search={search} />
					</h2>
				</div>
				<div className='flex items-center gap-2 p-2 border-b border-border'>
					<SearchInput
						onValueChange={(value) => setSearch(value)}
						placeholder={t('search_placeholder')}
						className='rounded-none text-sm placeholder:text-sm'
					/>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline'
								size='icon'
								aria-label={t('sort.label')}>
								<ArrowUpDown className='size-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='w-48'>
							<DropdownMenuRadioGroup
								value={orderBy}
								onValueChange={(val) =>
									setOrderBy(val as ChatMemberOrderBy)
								}>
								{orderByOptions.map((option) => (
									<DropdownMenuRadioItem
										key={option.value}
										value={option.value}>
										{t(option.labelKey)}
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<ChatMembersData
				params={{
					roomId,
					search,
					orderBy,
				}}
				currentUserId={user?.id}
				currentUserRole={'ADMIN'}
				onKick={(memberId) => {
					console.log('Kick member with ID:', memberId);
				}}
				className={className}
			/>
		</div>
	);
};
