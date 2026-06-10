import PhoneHeader from '@/components/layouts/Header';
import PhoneNav from '@/components/layouts/PhoneNav';

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			<PhoneHeader className='header' />
			{children}
			<PhoneNav />
		</>
	);
}
