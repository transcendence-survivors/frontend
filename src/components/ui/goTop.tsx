import { ArrowBigUpDash } from 'lucide-react';
import { Button } from './button';

const GoTop = () => {
	return (
		<div className='fixed bottom-4 right-4'>
			<Button
				asChild
				variant='ghost'
				size='icon-lg'
				className='rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground hover-scale-110 
                focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:scale-110'>
				<a href='#' tabIndex={1} aria-label='Go to top'>
					<ArrowBigUpDash className='size-4' />
				</a>
			</Button>
		</div>
	);
};

export default GoTop;
