import '@/app/globals.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import ThemeProvider from '@themes/providers/ThemeProvider';
import { QuerryProvider } from '@components/providers/QuerryProvider';
import { DEFAULT_LOCALE, Locale } from '@i18n/constants/locales';
import METADATA from '@i18n/constants/metadata';
import { Toaster } from 'sonner';

import { Manrope, Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const manrope = Manrope({
	subsets: ['latin'],
	variable: '--font-manrope',
	display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-space-grotesk',
	display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-jetbrains-mono',
	display: 'swap',
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
			className={`${manrope.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}>
			<body>
				<NextIntlClientProvider locale={locale}>
					<ThemeProvider>
						<QuerryProvider>{children}</QuerryProvider>
					</ThemeProvider>
				</NextIntlClientProvider>
				<Toaster
					closeButton={true}
					duration={3000}
					richColors
					expand
					theme='dark'
				/>
			</body>
		</html>
	);
}
