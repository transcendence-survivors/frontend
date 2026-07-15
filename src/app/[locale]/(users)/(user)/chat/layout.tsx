import ChatNav from '@/features/chat/components/ChatNav';

interface ChatLayoutProps {
	children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
	return (
		<div className='flex h-screen'>
			<ChatNav className='w-full sm:w-[250px] lg:w-xs' />
			<div className='flex-1'>{children}</div>
		</div>
	);
}
