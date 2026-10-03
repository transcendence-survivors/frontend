import HubLayout from '@/components/layouts/Hub/HubLayout';
import { ChatProvider } from '@/features/chat/components/ChatProvider';
import { RelationshipNotificationProvider } from '@/features/relationships/components/RelationshipNotificationProvider';

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	return (
		<RelationshipNotificationProvider>
			<ChatProvider>
				<HubLayout>{children}</HubLayout>
			</ChatProvider>
		</RelationshipNotificationProvider>
	);
}
