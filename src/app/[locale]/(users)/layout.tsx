import DashboardLayout from '@/components/layouts/Dashboard/DashboardLayout';
import PresenceProvider from '@/features/presence/components/PresenceProvider';
import WebsocketProvider from '@/modules/websocket/providers/WebsocketProvider';

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	return (
		<WebsocketProvider>
			<PresenceProvider>
				<DashboardLayout>{children}</DashboardLayout>
			</PresenceProvider>
		</WebsocketProvider>
	);
}
