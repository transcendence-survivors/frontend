import Layout from '@components/layouts/Layout';

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	return <Layout>{children}</Layout>;
}
