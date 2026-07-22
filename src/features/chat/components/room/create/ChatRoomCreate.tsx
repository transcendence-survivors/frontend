'use client';

import { Button } from '@/components/ui/button';
import { useChatRoomParams } from '@/features/chat/hooks/useChatRoomParams';
import { Plus } from 'lucide-react';
import ChatRoomCreateDialog from './ChatRoomCreateDialog';

const ChatRoomCreate = () => {
	const { params } = useChatRoomParams();

	return (
		<ChatRoomCreateDialog params={params}>
			<Button className='ml-auto' size='lg'>
				Create Chat
				<Plus className='size-4' />
			</Button>
		</ChatRoomCreateDialog>
	);
};

export default ChatRoomCreate;
