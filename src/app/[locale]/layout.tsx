import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

import '@/app/globals.css';
import { QuerryProvider } from '@/components/providers/QuerryProvider';
const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Transcendence Survivor',
	description: 'Frontend for Transcendence Survivor, a 42 project',
};

interface RootLayoutProps {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}

export default async function RootLayout({
	children,
	params,
}: RootLayoutProps) {
	const { locale } = await params;

	return (
		<html
			suppressHydrationWarning
			lang={locale}
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<NextIntlClientProvider locale={locale}>
					<ThemeProvider>
						<QuerryProvider>{children}</QuerryProvider>
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
