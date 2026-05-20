import '@/app/globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import ThemeProvider from '@themes/providers/ThemeProvider';
import { QuerryProvider } from '@components/providers/QuerryProvider';
import { Toaster } from 'sonner';
import { DEFAULT_LOCALE, Locale } from '@i18n/constants/locales';
import METADATA from '@i18n/constants/metadata';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});
const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

type Params = Promise<{
	locale: string;
}>;

interface RootLayoutProps {
	children: React.ReactNode;
	params: Params;
}

interface MetadataProps {
	params: Params;
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
	const locale = (await params).locale as Locale;
	return METADATA[locale] || METADATA[DEFAULT_LOCALE];
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
	const locale = (await params).locale as Locale;

	return (
		<html
			suppressHydrationWarning
			lang={locale}
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
			<body className='min-h-full flex flex-col'>
				<NextIntlClientProvider locale={locale}>
					<ThemeProvider>
						<QuerryProvider>{children}</QuerryProvider>
					</ThemeProvider>
				</NextIntlClientProvider>
				<Toaster />
			</body>
		</html>
	);
}
