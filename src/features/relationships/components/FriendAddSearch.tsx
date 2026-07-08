'use client';

import { SearchInput } from '@/components/ui/search-param-input';
import { UsersFeedData } from '@/features/user/components/UsersFeedData';
import { cn } from '@/libs/utils';
import { useState } from 'react';
import { FriendAddCard } from './FriendAddCard';

interface FriendAddSearchProps extends React.HTMLAttributes<HTMLElement> {
	placeholder: string;
}

const FriendAddSearch = ({ className, placeholder, ...props }: FriendAddSearchProps) => {
	const [search, setSearch] = useState('');

	const params = {
		search,
		feedParams: { feed: 'not-friends' as const },
	};

	return (
		<section className={cn(`flex flex-col gap-2 max-h-full`, className)} {...props}>
			<SearchInput
				defaultValue={search}
				onValueChange={setSearch}
				placeholder={placeholder}
				className='py-5'
			/>
			<div className='flex flex-col gap-2 overflow-y-auto no-scrollbar'>
				<UsersFeedData params={params} CardComponent={FriendAddCard} />
			</div>
		</section>
	);
};

export { FriendAddSearch };
