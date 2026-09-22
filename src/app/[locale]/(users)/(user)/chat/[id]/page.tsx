import ChatRoomHeader from '@/features/chat/components/room/ChatRoomHeader';
import { getChatRoom } from '@/features/chat/api/rooms';
import { isApiError } from '@/libs/api';
import { notFound } from 'next/navigation';
import ChatContainer from '@/features/chat/components/ChatContainer';
import { cookies } from 'next/headers';
import { ChatMembersSidebar } from '@/features/chat/components/sidebar/ChatMembersSidebar';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

interface ChatRoomPageProps {
	params: Promise<{ id: string }>;
}

export default async function page({ params }: ChatRoomPageProps) {
	const [{ id }, cookieStore] = await Promise.all([params, cookies()]);

	return (
		<Suspense
			fallback={
				<div className='flex flex-1 items-center justify-center h-full'>
					<Spinner className='size-10' />
				</div>
			}>
			<ChatRoom cookieString={cookieStore.toString()} roomId={id} />
		</Suspense>
	);
}

interface ChatRoomProps {
	roomId: string;
	cookieString: string;
}

async function ChatRoom({ cookieString, roomId }: ChatRoomProps) {
	const res = await getChatRoom(roomId, cookieString);

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
