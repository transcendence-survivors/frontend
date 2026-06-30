import PhoneNav from '@/components/layouts/PhoneNav';

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			{/* <div className='md:hidden'>
				<PhoneHeader />
			</div>
			<div className='hidden md:block'>
				<PcHeader />
			</div> */}

			<div className={'pb-20 md:pb-0'}>{children}</div>

			{/* <div className='md:hidden'>
				<PhoneNav />
			</div> */}
		</>
	);
}
