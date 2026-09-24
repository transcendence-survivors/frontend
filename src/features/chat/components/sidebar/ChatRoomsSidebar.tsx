'use client';

import ChatRoomCreateDialog from '../room/create/ChatRoomCreateDialog';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Plus } from 'lucide-react';
import { cn } from '@/libs/utils';
import { SearchParamsInput } from '@/components/ui/search-param-input';
import ChatRoomsData from '../room/ChatRoomsData';
import { ChatRoomFeed, ChatRoomOrderBy } from '../../types/room';
import { ButtonsState } from '@/components/ui/buttons-state';
import { useChatRoomParams } from '../../hooks/room/useChatRoomParams';
import { useRoomsSidebar } from './ChatSidebarContext';
import { useParams } from 'next/navigation';
import { ChatRoomsSidebarTrigger } from './ChatSidebarTrigger';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AppMessages } from '@/modules/i18n/messages/types';
import { DeepKeys } from '@/libs/types';
import { useTranslations } from 'next-intl';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type ChatNavProps = React.HTMLAttributes<HTMLElement>;

const orderByOptions: {
	value: ChatRoomOrderBy;
	labelKey: DeepKeys<AppMessages['chat']['rooms']>;
}[] = [
	{ value: ChatRoomOrderBy.ACTIVITY_DESC, labelKey: 'sort.activity_desc' },
	{ value: ChatRoomOrderBy.ACTIVITY_ASC, labelKey: 'sort.activity_asc' },
	{ value: ChatRoomOrderBy.CREATED_DESC, labelKey: 'sort.created_desc' },
	{ value: ChatRoomOrderBy.CREATED_ASC, labelKey: 'sort.created_asc' },
] as const;

const ChatRoomsSidebar = ({ className, ...props }: ChatNavProps) => {
	const { params, setFilters } = useChatRoomParams();
	const { id } = useParams();
	const { isOpen } = useRoomsSidebar();

	const t = useTranslations('chat.rooms');

	const setOrderBy = (value: ChatRoomOrderBy) => {
		setFilters({ orderBy: value });
	};

	return (
		<aside
			className={cn(
				'flex flex-col bg-card h-full transition-all min-h-0 absolute inset-0 z-20 w-full min-w-full lg:static overflow-hidden',
				isOpen || !id
					? 'translate-x-0 md:w-80 md:min-w-80 opacity-100 border-r border-border'
					: '-translate-x-full md:translate-x-0 md:w-0 md:min-w-0 opacity-0 border-none',
				className,
			)}
			{...props}>
			<div className='px-3 py-5 space-y-2 border-b border-border'>
				<div className='flex items-center justify-between gap-2 pl-1 pb-2'>
					<h1 className='font-display text-xl font-bold'>{t('title')}</h1>
					<div className='flex gap-1.5 items-center'>
						<Tooltip>
							<ChatRoomCreateDialog params={params}>
								<TooltipTrigger asChild>
									<Button className='h-auto w-auto p-1.5' size='icon'>
										<Plus className='size-4' />
									</Button>
								</TooltipTrigger>
							</ChatRoomCreateDialog>
							<TooltipContent>
								<p>{t('create.title')}</p>
							</TooltipContent>
						</Tooltip>
						{id && (
							<div className='lg:hidden'>
								<ChatRoomsSidebarTrigger />
							</div>
						)}
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<SearchParamsInput
						paramKey='search'
						placeholder={t('search_placeholder')}
						className='px-3 py-2'
					/>
					<Tooltip>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<TooltipTrigger asChild>
									<Button
										variant='secondary'
										size='icon'
										aria-label={t('sort.label')}>
										<ArrowUpDown className='size-4' />
									</Button>
								</TooltipTrigger>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='w-auto '>
								<DropdownMenuRadioGroup
									value={params.orderBy}
									onValueChange={(val) =>
										setOrderBy(val as ChatRoomOrderBy)
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
						<TooltipContent>
							<p>{t('sort.label')}</p>
						</TooltipContent>
					</Tooltip>
				</div>
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
			<div className='flex-1 min-h-0 overflow-y-auto no-scrollbar'>
				<ChatRoomsData params={params} />
			</div>
		</aside>
	);
};

export default ChatRoomsSidebar;
