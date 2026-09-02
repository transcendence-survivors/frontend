import ChatRoomHeader from '@/features/chat/components/room/ChatRoomHeader';
import ChatMessageForm from '@/features/chat/components/message/ChatMessageForm';
import { getChatRoom } from '@/features/chat/api/get';
import { isApiError } from '@/libs/api';
import { notFound } from 'next/navigation';
import { cookies } from 'next/dist/server/request/cookies';
import ChatMessages from '@/features/chat/components/message/ChatMessages';

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

				<div className='flex-1 overflow-y-auto py-6 px-4'>
					<ChatMessages roomId={id} />
				</div>
				<ChatMessageForm roomId={id} />
			</section>
		</main>
	);
}
