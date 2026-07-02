import Friends from '@/features/friends/components/friends/Friends';

export default function Page() {
	return (
		<section>
			<div className='max-w-4xl mx-auto'>
				<Friends className='friend-sub-sticky-if-tall pt-4 pb-2 border-b border-border' />
			</div>
		</section>
	);
}
