import { cn } from '@/libs/utils';
import { HTMLAttributes } from 'react';

export interface DisplayNameProps extends HTMLAttributes<HTMLSpanElement> {
	displayName: string;
	tag?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	className?: string;
}

const tagClassNames: Record<NonNullable<DisplayNameProps['tag']>, string> = {
	span: 'text-sm font-semibold  tracking-tight',
	h1: 'text-2xl font-bold ',
	h2: 'text-xl font-semibold',
	h3: 'text-lg font-semibold',
	h4: 'text-base font-semibold',
	h5: 'text-sm font-semibold',
	h6: 'text-xs font-semibold',
};

const UserDisplayName = ({
	displayName,
	tag = 'span',
	className,
	...props
}: DisplayNameProps) => {
	const Tag = tag;
	return (
		<Tag
			className={cn(tagClassNames[tag], 'text-foreground truncate', className)}
			{...props}>
			{displayName}
		</Tag>
	);
};

export default UserDisplayName;
