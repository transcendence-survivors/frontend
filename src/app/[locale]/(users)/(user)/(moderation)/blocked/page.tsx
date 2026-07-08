import Blocks from '@/features/relationships/block/components/Blocks';

export default function Page() {
	return (
		<section>
			<div className='max-w-4xl mx-auto'>
				<Blocks className='friend-sub-sticky-if-tall pt-4 pb-2 border-b border-border' />
			</div>
		</section>
	);
}
