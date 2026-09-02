import DashboardLayout from '@/components/layouts/Dashboard/DashboardLayout';
import { ChatProvider } from '@/features/chat/components/ChatProvider';
import PresenceProvider from '@/features/presence/components/PresenceProvider';
import WebsocketProvider from '@/modules/websocket/providers/WebsocketProvider';

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	return (
		<WebsocketProvider>
			<PresenceProvider>
				<ChatProvider>
					<DashboardLayout>{children}</DashboardLayout>
				</ChatProvider>
			</PresenceProvider>
		</WebsocketProvider>
	);
}
