'use client';

import { Button } from '@/components/ui/button';
import { useChatRoomParams } from '@/features/chat/hooks/room/useChatRoomParams';
import { Plus } from 'lucide-react';
import ChatRoomCreateDialog from './ChatRoomCreateDialog';

interface ChatRoomCreateProps {
	children?: React.ReactNode;
}

const ChatRoomCreate = ({ children }: ChatRoomCreateProps) => {
	const { params } = useChatRoomParams();

	return (
		<ChatRoomCreateDialog params={params}>
			<Button className='ml-auto' size='lg'>
				{children}
				<Plus className='size-4' />
			</Button>
		</ChatRoomCreateDialog>
	);
};

export default ChatRoomCreate;
