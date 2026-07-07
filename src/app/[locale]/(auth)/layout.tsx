interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			<div className={'pb-20 md:pb-0'}>{children}</div>
		</>
	);
}
