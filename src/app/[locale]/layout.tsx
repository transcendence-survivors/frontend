import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

	const queryClient = new QueryClient();

	return (
		<html
			lang={locale}
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<div>
					<QueryClientProvider client={queryClient}>
						<NextIntlClientProvider locale={locale}>
							{children}
						</NextIntlClientProvider>
					</QueryClientProvider>
				</div>
			</body>
		</html>
	);
}
