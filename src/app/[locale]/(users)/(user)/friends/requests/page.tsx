import { FriendRequests } from '@/features/friends/components/FriendRequests';

export default function Page() {
	return (
		<section>
			<div className='max-w-4xl mx-auto'>
				<FriendRequests
					className='sticky top-[calc(var(--spacing)_*_46_+_var(--header-height))] 
                    z-10 bg-background pt-4 pb-2 border-b border-border'
				/>
			</div>
		</section>
	);
}
