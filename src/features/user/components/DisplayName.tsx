import { cn } from '@/libs/utils';
import { HTMLAttributes } from 'react';

export interface DisplayNameProps extends HTMLAttributes<HTMLSpanElement> {
	displayName: string;
	tag?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	className?: string;
}

const DisplayName = ({
	displayName,
	tag = 'span',
	className,
	...props
}: DisplayNameProps) => {
	const Tag = tag;
	return (
		<Tag className={cn('font-bold text-base leading-none', className)} {...props}>
			{displayName}
		</Tag>
	);
};

export default DisplayName;
