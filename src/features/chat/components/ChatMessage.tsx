import { Message } from '@/app/[locale]/(users)/(user)/chat/[id]/page';

interface ChatMessageProps {
	message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
	return (
		<div
			className={`flex ${message.from === 'me' ? 'justify-end' : 'justify-start'}`}>
			<div className='max-w-[80%]'>
				<div
					className={`rounded-md px-3.5 py-2 text-sm ${
						message.from === 'me'
							? 'bg-primary text-primary-foreground'
							: 'bg-card border border-border'
					}`}>
					{message.text}
				</div>
				<div
					className={`mt-1 font-mono text-[10px] text-muted-foreground ${message.from === 'me' ? 'text-right' : ''}`}>
					{message.time}
				</div>
			</div>
		</div>
	);
};

export default ChatMessage;
