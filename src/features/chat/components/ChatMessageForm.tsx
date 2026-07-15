import { cn } from '@/libs/utils';
import { Paperclip, Send } from 'lucide-react';

interface ChatMessageFormProps extends React.HTMLAttributes<HTMLFormElement> {}

const ChatMessageForm = ({ className, ...props }: ChatMessageFormProps) => {
	return (
		<form
			className={cn('border-t border-border bg-card p-3 md:p-4', className)}
			{...props}>
			<div className='grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2'>
				<button className='rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground'>
					<Paperclip className='h-4 w-4' />
				</button>
				<input
					placeholder='Send a message into the dark…'
					className='min-w-0 rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none'
				/>
				<button className='flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90'>
					<Send className='h-3.5 w-3.5' />
					Send
				</button>
			</div>
		</form>
	);
};

export default ChatMessageForm;
