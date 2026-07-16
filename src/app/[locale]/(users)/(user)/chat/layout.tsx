import ChatNav from '@/features/chat/components/room/ChatRoomsNav';

interface ChatLayoutProps {
	children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
	return (
		<div className='flex h-main'>
			<ChatNav className='w-full sm:w-[250px] lg:w-xs' />
			<div className='flex-1'>{children}</div>
		</div>
	);
}
