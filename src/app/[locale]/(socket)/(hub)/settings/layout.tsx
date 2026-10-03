import UserSettingsSidebar from '@/features/user/components/Settings/UserSettingSidebar';
import { UserSettingsSidebarProvider } from '@/features/user/components/Settings/UserSettingsSidebarProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<UserSettingsSidebarProvider>
			<div className='flex h-main relative'>
				<UserSettingsSidebar />
				<div className='flex-1'>{children}</div>
			</div>
		</UserSettingsSidebarProvider>
	);
}
