import '@/app/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import ThemeProvider from '@themes/providers/ThemeProvider';
import { QuerryProvider } from '@components/providers/QuerryProvider';
import { Toaster } from 'sonner';
import { DEFAULT_LOCALE, Locale } from '@i18n/constants/locales';
import METADATA from '@i18n/constants/metadata';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});
const interMono = Inter({
	variable: '--font-inter-mono',
	subsets: ['latin'],
	weight: '400',
});

type Params = Promise<{
	locale: string;
}>;

interface MetadataProps {
	params: Params;
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
	const locale = (await params).locale as Locale;
	return METADATA[locale] || METADATA[DEFAULT_LOCALE];
}

interface RootLayoutProps {
	children: React.ReactNode;
	params: Params;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
	const locale = (await params).locale as Locale;

	return (
		<html
			suppressHydrationWarning
			lang={locale}
			className={`${inter.variable} ${interMono.variable} h-full antialiased`}>
			<body className='min-h-full flex flex-col'>
				<NextIntlClientProvider locale={locale}>
					<ThemeProvider>
						<QuerryProvider>{children}</QuerryProvider>AD
					</ThemeProvider>
				</NextIntlClientProvider>
				<Toaster
					closeButton={true}
					containerAriaLabel='Notification container'
					duration={3000}
				/>
			</body>
		</html>
	);
}
