import '@/app/globals.css';
import '@/app/sonner.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import ThemeProvider from '@themes/providers/ThemeProvider';
import { QuerryProvider } from '@components/providers/QuerryProvider';
import { DEFAULT_LOCALE, Locale } from '@i18n/constants/locales';
import METADATA from '@i18n/constants/metadata';
import { Toaster } from 'sonner';

import { Manrope, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { X } from 'lucide-react';
import { NuqsProvider } from '@/components/providers/NuqsProvider';

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
						<NuqsProvider>
							<QuerryProvider>{children}</QuerryProvider>
						</NuqsProvider>
					</ThemeProvider>
				</NextIntlClientProvider>
				<Toaster
					closeButton
					expand={false}
					theme='dark'
					icons={{
						close: <X className='size-3' />,
					}}
				/>
			</body>
		</html>
	);
}
