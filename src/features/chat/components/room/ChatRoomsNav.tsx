'use client';

import ChatRoomCreateDialog from './create/ChatRoomCreateDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/libs/utils';
import { SearchParamsInput } from '@/components/ui/search-param-input';
import ChatRoomsData from './ChatRoomsData';
import { ChatRoomFeed } from '../../types';
import { useOnlineFriends } from '@/features/presence/hooks/useOnlineFriends';
import { ButtonsState } from '@/components/ui/buttons-state';
import { useChatRoomParams } from '../../hooks/useChatRoomParams';

type ChatNavProps = React.HTMLAttributes<HTMLElement>;

const ChatRoomsNav = ({ className, ...props }: ChatNavProps) => {
	const { params, setFilters } = useChatRoomParams();
	const { getFriendStatus } = useOnlineFriends();

	return (
		<aside
			className={cn(
				'flex h-full flex-col border-r border-border bg-card w-full ',
				className,
			)}
			{...props}>
			<div className='px-3 py-5 space-y-2'>
				<div className='flex items-center justify-between gap-2 pl-1 pb-2'>
					<h1 className='font-display text-xl font-bold'>Messages</h1>
					<ChatRoomCreateDialog params={params}>
						<Button className='h-auto w-auto p-1.5' size='icon'>
							<Plus className='size-4' />
						</Button>
					</ChatRoomCreateDialog>
				</div>
				<SearchParamsInput
					paramKey='search'
					placeholder='Search conversations'
					className='px-3 py-5'
				/>
				<ButtonsState
					setValue={(value) => setFilters({ type: value })}
					value={params.type}
					className='w-full'
					buttonClassName='flex-1 capitalize'
					buttons={[
						{ node: 'all', value: ChatRoomFeed.ALL },
						{ node: 'direct', value: ChatRoomFeed.DIRECT },
						{ node: 'group', value: ChatRoomFeed.GROUP },
					]}
				/>
			</div>
			<div className='overflow-y-auto no-scrollbar'>
				<ChatRoomsData params={params} getFriendStatus={getFriendStatus} />
			</div>
		</aside>
	);
};

export default ChatRoomsNav;
