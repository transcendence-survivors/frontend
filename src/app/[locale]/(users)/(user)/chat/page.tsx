import { Card } from '@/components/ui/card';
import Kicker from '@/components/ui/kicker';
import ChatRoomCreate from '@/features/chat/components/room/create/ChatRoomCreate';
import { getTranslations } from 'next-intl/server';

export default async function ChatRooms() {
	const t = await getTranslations('chat.rooms.page');

	return (
		<main className='sr-only sm:not-sr-only sm:h-screen sm:p-4 flex flex-col items-center justify-center'>
			<Card className='max-w-md w-full p-6'>
				<section className='space-y-2'>
					<h1 className='text-3xl font-bold'>{t('title')}</h1>
					<Kicker className='text-muted-foreground'>{t('subtitle')}</Kicker>
					<div
						className='flex items-center justify-center gap-2 
                        mt-4 border-t border-border pt-3
                        md:flex-col md:items-start lg:flex-row lg:items-center'>
						<div className='text-muted-foreground text-xs'>
							<p>{t('not_created')}</p>
							<span>{t('ask_friends')}</span>
						</div>
						<ChatRoomCreate>{t('create_button')}</ChatRoomCreate>
					</div>
				</section>
			</Card>
		</main>
	);
}
