import { cn } from '@/libs/utils';
import { HTMLAttributes } from 'react';

export interface UsernameProps extends HTMLAttributes<HTMLSpanElement> {
	username: string;
	tag?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	className?: string;
}

<div className='min-w-0'>
	<p className='text-sm font-semibold text-foreground truncate'>Elara Vélinne</p>
</div>;

const Username = ({ username, tag = 'span', className, ...props }: UsernameProps) => {
	const Tag = tag;
	return (
		<Tag
			className={cn('text-xs text-muted-foreground truncate', className)}
			{...props}>
			@{username}
		</Tag>
	);
};

export default Username;
