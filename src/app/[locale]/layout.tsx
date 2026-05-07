import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@themes';
import { QuerryProvider } from '@components/providers/QuerryProvider';
import { type Locale, DEFAULT_LOCALE, METADATA } from '@/modules/i18n';
import { Toaster } from 'sonner';

import '@/app/globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
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
