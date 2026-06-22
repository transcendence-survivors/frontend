import Layout from '@/components/layouts/Dashboard/DashboardLayout';

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	return <Layout>{children}</Layout>;
}
