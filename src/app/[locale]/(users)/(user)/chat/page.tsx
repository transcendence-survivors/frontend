import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Kicker from '@/components/ui/kicker';
import ChatRoomCreate from '@/features/chat/components/room/create/ChatRoomCreate';

export default function ChatRooms() {
	return (
		<main className='sr-only sm:not-sr-only sm:h-screen sm:p-4 flex flex-col items-center justify-center'>
			<Card className='max-w-md w-full p-6'>
				<section className='space-y-2'>
					<h1 className='text-3xl font-bold'>No Chat Selected</h1>
					<Kicker className='text-muted-foreground'>
						Select a chat to start messaging.
					</Kicker>
					<div
						className='flex items-center justify-center gap-2 
                        mt-4 border-t border-border pt-3
                        md:flex-col md:items-start lg:flex-row lg:items-center'>
						<div className='text-muted-foreground text-xs'>
							<p>Chat room not created ?</p>
							<span>Ask your friends to play with you!</span>
						</div>
						<ChatRoomCreate />
					</div>
				</section>
			</Card>
		</main>
	);
}
