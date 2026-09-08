import { ChatMessage, ChatMessageType } from '@/features/chat/types/message';
import { getSystemMessage } from '@/features/chat/utils/message';
import { useTranslations } from 'next-intl';

interface ChatMessageSystemProps {
	message: Exclude<ChatMessage, { type: ChatMessageType.TEXT }>;
}

export const ChatMessageSystem = ({ message }: ChatMessageSystemProps) => {
	const t = useTranslations('chat');

	return (
		<div className='my-2 flex justify-center text-center'>
			<span className='rounded-full bg-muted/50 px-3 py-1 text-xs text-muted-foreground'>
				{getSystemMessage(message, t)}
			</span>
		</div>
	);
};
