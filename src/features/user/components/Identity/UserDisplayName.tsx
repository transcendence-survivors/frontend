import { cn } from '@/libs/utils';
import { HTMLAttributes } from 'react';

export interface DisplayNameProps extends HTMLAttributes<HTMLSpanElement> {
	displayName: string;
	tag?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	className?: string;
}

const tagClassNames: Record<NonNullable<DisplayNameProps['tag']>, string> = {
	span: 'text-sm font-semibold text-foreground truncate',
	h1: 'text-2xl font-bold text-foreground truncate',
	h2: 'text-xl font-semibold text-foreground truncate',
	h3: 'text-lg font-semibold text-foreground truncate',
	h4: 'text-base font-semibold text-foreground truncate',
	h5: 'text-sm font-semibold text-foreground truncate',
	h6: 'text-xs font-semibold text-foreground truncate',
};

const UserDisplayName = ({
	displayName,
	tag = 'span',
	className,
	...props
}: DisplayNameProps) => {
	const Tag = tag;
	return (
		<Tag className={cn(tagClassNames[tag], className)} {...props}>
			{displayName}
		</Tag>
	);
};

export default UserDisplayName;
