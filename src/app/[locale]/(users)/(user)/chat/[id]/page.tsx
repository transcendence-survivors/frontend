import ChatRoomHeader from '@/features/chat/components/room/ChatRoomHeader';
import { getChatRoom } from '@/features/chat/api/get';
import { isApiError } from '@/libs/api';
import { notFound } from 'next/navigation';
import { cookies } from 'next/dist/server/request/cookies';
import ChatContainer from '@/features/chat/components/ChatContainer';

interface ChatRoomProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function ChatRoom({ params }: ChatRoomProps) {
	const [{ id }, cookieStore] = await Promise.all([params, cookies()]);
	const res = await getChatRoom(id, cookieStore.toString());
	if (isApiError(res)) {
		notFound();
	}
	const room = res.data;

	return (
		<main className='flex w-full min-h-0 h-full'>
			<section className={`flex flex-col flex-1 bg-background`}>
				<ChatRoomHeader room={room} />
				<ChatContainer roomId={room.id} />
			</section>
		</main>
	);
}
