'use client';

import { cn } from '@/libs/utils';
import { useChatSidebar } from './ChatSidebarContext';
import { ChatMembers } from '../member/ChatMembers';
import { ChatMemberRole } from '../../types/member';

interface ChatMembersSidebarProps extends React.HTMLAttributes<HTMLElement> {
	roomId: string;
	currentUserRole: ChatMemberRole;
}

export const ChatSidebar = ({
	roomId,
	currentUserRole,
	className,
	...props
}: ChatMembersSidebarProps) => {
	const { isOpen } = useChatSidebar();

	return (
		<aside
			className={cn(
				'bg-background transition-all duration-150 ease-in-out flex flex-col min-h-0',
				isOpen
					? 'w-72 min-w-72  opacity-100 border-l border-border'
					: 'w-0 min-w-0 opacity-0 overflow-hidden border-none',
				className,
			)}
			{...props}>
			<ChatMembers roomId={roomId} currentUserRole={currentUserRole} />
		</aside>
	);
};
