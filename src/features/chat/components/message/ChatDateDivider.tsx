import { memo } from 'react';

interface ChatDateDividerProps {
	date: string;
}

export const ChatDateDivider = memo(({ date }: ChatDateDividerProps) => (
	<div className='my-2 flex items-center justify-center gap-3 text-xs text-muted-foreground'>
		<span className='h-px flex-1 bg-border' />
		<span>{date}</span>
		<span className='h-px flex-1 bg-border' />
	</div>
));

ChatDateDivider.displayName = 'ChatDateDivider';
