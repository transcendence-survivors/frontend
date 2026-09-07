'use client';

import { Button } from '@/components/ui/button';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { useChatSidebar } from './ChatSidebarContext';

export const ChatSidebarTrigger = () => {
	const { isOpen, toggle } = useChatSidebar();

	return (
		<Button
			variant={isOpen ? 'secondary' : 'ghost'}
			size='icon'
			onClick={toggle}
			data-active={isOpen}>
			{isOpen ? (
				<PanelRightClose className='size-4' />
			) : (
				<PanelRightOpen className='size-4' />
			)}
		</Button>
	);
};
