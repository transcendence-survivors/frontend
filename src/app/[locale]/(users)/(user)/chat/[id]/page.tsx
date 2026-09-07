import ChatRoomHeader from '@/features/chat/components/room/ChatRoomHeader';
import { getChatRoom } from '@/features/chat/api/get';
import { isApiError } from '@/libs/api';
import { notFound } from 'next/navigation';
import ChatContainer from '@/features/chat/components/ChatContainer';
import { cookies } from 'next/headers';
import { ChatSidebarProvider } from '@/features/chat/components/sidebar/ChatSidebarContext';
import { ChatSidebar } from '@/features/chat/components/sidebar/ChatSidebar';

interface ChatRoomProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function ChatRoom({ params }: ChatRoomProps) {
	const [{ id }, cookieStore] = await Promise.all([params, cookies()]);
	const res = await getChatRoom(id, cookieStore.toString());

	if (isApiError(res)) notFound();
	const room = res.data;

	return (
		<main>
			<ChatSidebarProvider>
				<ChatRoomHeader room={room} />
				<div className='flex'>
					<ChatContainer roomId={room.id} />
					<ChatSidebar roomId={room.id} />
				</div>
			</ChatSidebarProvider>
		</main>
	);
}
