import ChatCreateDialog from './action/ChatCreateDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/libs/utils';
import { SearchParamsInput } from '@/components/ui/search-param-input';
import ChatRoomsData from './ChatRoomsData';

type ChatNavProps = React.HTMLAttributes<HTMLElement>;

const ChatNav = ({ className, ...props }: ChatNavProps) => {
	return (
		<aside
			className={cn(
				'flex h-full flex-col border-r border-border bg-card w-full ',
				className,
			)}
			{...props}>
			<div className='px-3 py-5 space-y-2'>
				<div className='flex items-center justify-between gap-2'>
					<h1 className='font-display text-xl font-bold'>Messages</h1>
					<ChatCreateDialog>
						<Button className='h-auto w-auto p-1.5' size='icon'>
							<Plus className='size-4' />
						</Button>
					</ChatCreateDialog>
				</div>
				<SearchParamsInput
					paramKey='search'
					placeholder='Search conversations'
					debounceMs={500}
					className='px-3 py-5'
				/>
			</div>
			<div>
				<ChatRoomsData params={{}} />
			</div>
		</aside>
	);
};

export default ChatNav;
