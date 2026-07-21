import ChatMessage from '@/features/chat/components/ChatMessage';
import ChatRoomHeader from '@/features/chat/components/room/ChatRoomHeader';
import ChatMessageForm from '@/features/chat/components/ChatMessageForm';
import { getChatRoom } from '@/features/chat/api/get';
import { isApiError } from '@/libs/api';
import { notFound } from 'next/navigation';
import { cookies } from 'next/dist/server/request/cookies';

export type Message = {
	id: string;
	from: 'me' | 'them';
	text: string;
	time: string;
};

const initialMessages = [
	{
		id: 'm1',
		from: 'them',
		text: "you up? the Veille's about to enter a new strata",
		time: '21:02',
	},
	{
		id: 'm2',
		from: 'me',
		text: "lantern's lit. where are you? lantern's lit. where are you? lantern's lit. where are you? lantern's lit. where are you? lantern's lit. where are you? lantern's lit. where are you? lantern's lit. where are you?",
		time: '21:03',
	},
	{
		id: 'm3',
		from: 'them',
		text: 'near the old fork. halos will stack if we group before the dark closes',
		time: '21:03',
	},
	{
		id: 'm4',
		from: 'them',
		text: 'catch the next Veille wi catch the next Veille with me catch the next Veille with me catch the next Veille with me catch the next Veille with me catch the next Veille with me catch the next Veille with me catch the next Veille with me catch the next Veille with me catch the next Veille with me catch the next Veille with me catch the next Veille with me catch the next Veille with meth me?',
		time: '21:04',
	},
	{ id: 'm5', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm6', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm7', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm8', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm9', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm10', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm11', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm12', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm13', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm14', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm15', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm16', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm17', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm18', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm19', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm20', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm21', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm22', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm23', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm24', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm25', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm26', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm27', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm28', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm29', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
	{ id: 'm30', from: 'them', text: 'catch the next Veille with me?', time: '21:04' },
] as const;

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

				<div className='flex-1 overflow-y-auto px-4 py-6 md:px-10'>
					<div className='my-4 flex items-center justify-center gap-3 eyebrow'>
						<span className='h-px w-8 bg-border' />
						Today
						<span className='h-px w-8 bg-border' />
					</div>
					<div className='flex flex-col gap-3'>
						{initialMessages.map((m) => (
							<ChatMessage key={m.id} message={m} />
						))}
					</div>
				</div>
				<ChatMessageForm />
			</section>
		</main>
	);
}
