'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ImageModal } from '@/components/ui/image-modal';
import {
	usePresenceActions,
	usePresenceState,
} from '@/modules/websocket/stores/presence';

const post = {
	id: '1',
	title: 'My First Post',
	content:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nunc.',
	images: [
		{
			url: 'https://upload.wikimedia.org/wikipedia/fr/c/ca/Batman_logo.png',
			alt: 'Batman Logo',
		},
		{
			url: 'https://upload.wikimedia.org/wikipedia/fr/c/ca/Batman_logo.png',
			alt: 'Batman Logo',
		},
	],
};

export default function Feed() {
	const { globalOnlineCount, onlineFriendsCount, onlineFriends } = usePresenceState();
	const { goInvisible, goVisible, goDoNotDisturb } = usePresenceActions();

	return (
		<main>
			<section className='border-b py-5'>
				<div className=' px-6'>
					<ul>
						<li>Global Online Users: {globalOnlineCount}</li>
						<li>Online Friends: {onlineFriendsCount}</li>
					</ul>

					<ul>
						{Array.from(onlineFriends.entries()).map(([friendId, friend]) => (
							<li key={friendId}>
								Friend ID: {friendId}, Status: {friend.status}
							</li>
						))}
					</ul>
					<div>
						<Button onClick={() => goInvisible()}>Go Invisible</Button>
						<Button onClick={() => goVisible()}>Go Visible</Button>
						<Button onClick={() => goDoNotDisturb()}>
							Go Do Not Disturb
						</Button>
					</div>
				</div>
			</section>
			<section className='max-w-3xl mx-auto px-4 py-8'>
				<Card className='w-full cursor-pointer'>
					<CardHeader>
						<h2 className='text-lg font-semibold'>{post.title}</h2>
					</CardHeader>
					<CardContent className='space-y-4'>
						<p className='text-base'>{post.content}</p>
						<ul className='w-full aspect-square max-h-80 grid grid-cols-2'>
							{post.images.map((image, index) => (
								<ImageModal
									key={index}
									src={image.url}
									alt={image.alt}
									thumbnailClassName='w-full h-auto aspect-square object-center span-1 row-span-1'>
									Click to view the image in full size
								</ImageModal>
							))}
						</ul>
					</CardContent>
				</Card>
			</section>
		</main>
	);
}
