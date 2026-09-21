import ChatRoomHeader from '@/features/chat/components/room/ChatRoomHeader';
import { getChatRoom } from '@/features/chat/api/rooms';
import { isApiError } from '@/libs/api';
import { notFound } from 'next/navigation';
import ChatContainer from '@/features/chat/components/ChatContainer';
import { cookies } from 'next/headers';
import { ChatMembersSidebar } from '@/features/chat/components/sidebar/ChatMembersSidebar';

interface ChatRoomProps {
	params: Promise<{ id: string }>;
}

export default async function ChatRoom({ params }: ChatRoomProps) {
	const [{ id }, cookieStore] = await Promise.all([params, cookies()]);
	const res = await getChatRoom(id, cookieStore.toString());

	if (isApiError(res)) {
		console.error('Error fetching chat room:', res);
		notFound();
	}
	const { currentUserRole: role, ...room } = res.data;

	return (
		<main className='flex flex-col h-full overflow-clip min-w-0 max-w-full'>
			<ChatRoomHeader />
			<div className='flex flex-1 min-h-0 relative'>
				<ChatContainer room={room} role={role} />
				{room.type === 'GROUP' && <ChatMembersSidebar roomId={room.id} />}
			</div>
		</main>
	);
}
