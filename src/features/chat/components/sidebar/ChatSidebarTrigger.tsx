'use client';

import { Button } from '@/components/ui/button';
import {
	PanelLeftClose,
	PanelLeftOpen,
	PanelRightClose,
	PanelRightOpen,
} from 'lucide-react';
import { useMembersSidebar, useRoomsSidebar } from './ChatSidebarContext';

type ChatSidebarTriggerProps = React.ComponentProps<typeof Button>;

export const ChatMemberSidebarTrigger = ({ ...props }: ChatSidebarTriggerProps) => {
	const { isOpen, toggle } = useMembersSidebar();

	return (
		<Button
			variant={isOpen ? 'secondary' : 'ghost'}
			size='icon'
			onClick={toggle}
			data-active={isOpen}
			{...props}>
			{isOpen ? (
				<PanelRightClose className='size-4' />
			) : (
				<PanelRightOpen className='size-4' />
			)}
		</Button>
	);
};

export const ChatRoomsSidebarTrigger = ({ ...props }: ChatSidebarTriggerProps) => {
	const { isOpen, toggle } = useRoomsSidebar();

	return (
		<Button
			variant={isOpen ? 'secondary' : 'ghost'}
			size='icon'
			onClick={toggle}
			data-active={isOpen}
			{...props}>
			{isOpen ? (
				<PanelLeftClose className='size-4' />
			) : (
				<PanelLeftOpen className='size-4' />
			)}
		</Button>
	);
};
