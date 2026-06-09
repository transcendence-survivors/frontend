'use client';

import { Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface InputPhoneProps extends React.ComponentProps<'input'> {
	format?: string;
}

const InputPhone = ({ format, ...props }: InputPhoneProps) => (
	<div className='space-y-2 w-full'>
		<div className='relative'>
			<Phone className='-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground' />
			<Input className='bg-background pl-9' type='tel' {...props} />
		</div>
		{format && <p className='text-muted-foreground text-xs'>Format: {format}</p>}
	</div>
);

export default InputPhone;
