import ChatNav from '@/features/chat/components/sidebar/ChatRoomsSidebar';
import { ChatSidebarsProvider } from '@/features/chat/components/sidebar/ChatSidebarContext';

interface ChatLayoutProps {
	children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
	return (
		<ChatSidebarsProvider>
			<div className='flex h-main relative'>
				<ChatNav />
				<div className='flex-1'>{children}</div>
			</div>
		</ChatSidebarsProvider>
	);
}
