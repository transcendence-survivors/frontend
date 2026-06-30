import DashboardLayout from '@/components/layouts/Dashboard/DashboardLayout';
import WebsocketProvider from '@/modules/websocket/providers/WebsocketProvider';

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			<WebsocketProvider>
				<DashboardLayout>{children}</DashboardLayout>
			</WebsocketProvider>
		</>
	);
}
