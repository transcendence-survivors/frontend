import { FriendRequests } from '@/features/friends/components/requests/FriendRequests';

export default function Page() {
	return (
		<section>
			<div className='max-w-4xl mx-auto'>
				<FriendRequests className='friend-sub-sticky-if-tall pt-4 pb-2 border-b border-border' />
			</div>
		</section>
	);
}
