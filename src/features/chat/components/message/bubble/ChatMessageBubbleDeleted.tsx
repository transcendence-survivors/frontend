interface ChatMessageBubbleDeletedProps {
	isMe: boolean;
}

export const ChatMessageBubbleDeleted = ({ isMe }: ChatMessageBubbleDeletedProps) => (
	<div
		className={`flex items-end gap-2 px-4 py-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
		<div
			className={`rounded-2xl border border-dashed border-border px-4 py-2 text-xs italic text-muted-foreground 
            ${isMe ? '' : 'ml-10'}`}>
			This message was deleted
		</div>
	</div>
);
