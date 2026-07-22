import { Search } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';

interface InputSearchProps extends React.ComponentProps<'input'> {
	buttonProps?: React.ComponentProps<'button'>;
}

const InputSearch = ({ buttonProps, ...props }: InputSearchProps) => {
	return (
		<div className='relative w-full'>
			<Input {...props} type='text' className='pr-8' />
			<Button
				className='absolute top-0 right-0 h-full px-3 hover:bg-transparent'
				size='icon'
				type='button'
				variant='ghost'
				{...buttonProps}>
				<Search className='h-4 w-4 text-muted-foreground' />
			</Button>
		</div>
	);
};

export { InputSearch };
