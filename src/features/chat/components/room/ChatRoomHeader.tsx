import { cn } from '@/libs/utils';
import { ChatRoomsSidebarTrigger } from '../sidebar/ChatSidebarTrigger';

import ChatRoomOverview from './ChatRoomOverview';
import ChatRoomActions from './ChatRoomActions';

type ChatRoomHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const ChatRoomHeader = ({ className, ...props }: ChatRoomHeaderProps) => {
	return (
		<header
			className={cn(
				'flex flex-col-reverse md:flex-row justify-between gap-3 border-b border-border px-4 py-3 md:px-6 md:py-4 w-full min-w-0',
				className,
			)}
			{...props}>
			<div className='flex items-center gap-4 min-w-0'>
				<div className='hidden md:block text-muted-foreground'>
					<ChatRoomsSidebarTrigger />
				</div>
				<ChatRoomOverview />
			</div>

			<div className='flex items-center justify-between gap-2 min-w-0'>
				<div className='md:hidden text-muted-foreground'>
					<ChatRoomsSidebarTrigger />
				</div>
				<ChatRoomActions />
			</div>
		</header>
	);
};

export default ChatRoomHeader;
