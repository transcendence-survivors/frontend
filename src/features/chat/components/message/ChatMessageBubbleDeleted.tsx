interface ChatMessageBubbleDeletedProps {
	isMe: boolean;
}

export const ChatMessageBubbleDeleted = ({ isMe }: ChatMessageBubbleDeletedProps) => (
	<div
		className={`flex items-end gap-2 px-4 py-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
		{!isMe && <div className='size-8 shrink-0' />}
		<div className='rounded-2xl border border-dashed border-border px-4 py-2 text-xs italic text-muted-foreground'>
			This message was deleted
		</div>
	</div>
);
