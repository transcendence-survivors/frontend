import DashboardLayout from '@/components/layouts/Dashboard/DashboardLayout';
import { ChatProvider } from '@/features/chat/components/ChatProvider';
import PresenceProvider from '@/features/presence/components/PresenceProvider';
import { RelationshipNotificationProvider } from '@/features/relationships/components/RelationshipNotificationProvider';
import WebsocketProvider from '@/modules/websocket/providers/WebsocketProvider';

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	return (
		<WebsocketProvider>
			<PresenceProvider>
				<RelationshipNotificationProvider>
					<ChatProvider>
						<DashboardLayout>{children}</DashboardLayout>
					</ChatProvider>
				</RelationshipNotificationProvider>
			</PresenceProvider>
		</WebsocketProvider>
	);
}
