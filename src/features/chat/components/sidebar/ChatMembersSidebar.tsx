'use client';

import { cn } from '@/libs/utils';
import { useMembersSidebar } from './ChatSidebarContext';
import { ChatMembers } from '../member/ChatMembers';
import { ChatMemberRole } from '../../types/member';

interface ChatMembersSidebarProps extends React.HTMLAttributes<HTMLElement> {
	roomId: string;
	currentUserRole: ChatMemberRole;
}

export const ChatMembersSidebar = ({
	roomId,
	currentUserRole,
	className,
	...props
}: ChatMembersSidebarProps) => {
	const { isOpen } = useMembersSidebar();

	return (
		<aside
			className={cn(
				'bg-background transition-all duration-150 ease-in-out flex flex-col min-h-0 absolute inset-0 z-10 w-full min-w-full xl:static',
				isOpen
					? 'translate-x-0 xl:w-72 xl:min-w-72 opacity-100 border-l border-border'
					: 'translate-x-full xl:translate-x-0 xl:w-0 xl:min-w-0 opacity-0 border-none overflow-hidden ',
				className,
			)}
			{...props}>
			<ChatMembers roomId={roomId} role={currentUserRole} />
		</aside>
	);
};
