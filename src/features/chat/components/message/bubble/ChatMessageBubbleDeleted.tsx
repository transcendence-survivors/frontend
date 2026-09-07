import { cn } from '@/libs/utils';
import { HTMLAttributes } from 'react';

type ChatMessageBubbleDeletedProps = HTMLAttributes<HTMLDivElement> & {};

export const ChatMessageBubbleDeleted = ({
	className,
	...props
}: ChatMessageBubbleDeletedProps) => (
	<div
		className={cn(
			'rounded-2xl border border-dashed border-border px-4 py-2 text-xs italic text-muted-foreground',
			className,
		)}
		{...props}>
		This message was deleted
	</div>
);
