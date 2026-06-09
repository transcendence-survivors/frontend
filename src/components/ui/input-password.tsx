'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const InputPassword = ({ ...props }: React.ComponentProps<'input'>) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className='relative w-full'>
			<Input {...props} type={showPassword ? 'text' : 'password'} />
			<Button
				className='absolute top-0 right-0 h-full px-3 hover:bg-transparent'
				onClick={() => setShowPassword(!showPassword)}
				size='icon'
				type='button'
				variant='ghost'>
				{showPassword ? (
					<EyeOff className='h-4 w-4 text-muted-foreground' />
				) : (
					<Eye className='h-4 w-4 text-muted-foreground' />
				)}
			</Button>
		</div>
	);
};

export default InputPassword;
