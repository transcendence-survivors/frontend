import { cn } from '@/libs/utils';
import { HTMLAttributes } from 'react';

export interface UsernameProps extends HTMLAttributes<HTMLSpanElement> {
	username: string;
	tag?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	className?: string;
}

const tagClassNames: Record<NonNullable<UsernameProps['tag']>, string> = {
	span: 'text-xs',
	h1: 'text-lg',
	h2: 'text-md',
	h3: 'text-md',
	h4: 'text-sm',
	h5: 'text-sm',
	h6: 'text-xs',
};

const Username = ({ username, tag = 'span', className, ...props }: UsernameProps) => {
	const Tag = tag;
	return (
		<Tag
			className={cn(
				'text-xs text-muted-foreground truncate',
				tagClassNames[tag],
				className,
			)}
			{...props}>
			@{username}
		</Tag>
	);
};

export default Username;
