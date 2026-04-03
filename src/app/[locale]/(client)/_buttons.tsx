'use client';
import { Button } from '@/components/ui/button';

export const PageButton = () => {
	const handleClick = () => {
		console.log('Button clicked!');
	};

	return (
		<div className='flex gap-2'>
			<Button onClick={() => handleClick()} asChild>
				<Button onClick={() => handleClick()}>Page 1</Button>
			</Button>
		</div>
	);
};
