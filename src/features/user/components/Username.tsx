import { cn } from '@/libs/utils';
import { HTMLAttributes } from 'react';

export interface UsernameProps extends HTMLAttributes<HTMLSpanElement> {
	username: string;
	tag?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	className?: string;
}

const Username = ({ username, tag = 'span', className, ...props }: UsernameProps) => {
	const Tag = tag;
	return (
		<Tag
			className={cn('font-extralight text-base leading-none', className)}
			{...props}>
			@{username}
		</Tag>
	);
};

export default Username;
