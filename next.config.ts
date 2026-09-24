import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
	output: 'standalone',
	allowedDevOrigins: ['localhost', '127.0.0.1', '::1', '10.13.2.2'],
	reactStrictMode: true,
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},

			{
				protocol: 'http',
				hostname: 'localhost',
				port: '9000',
			},
		],
	},
	devIndicators: false,
	transpilePackages: ['@transcendence/game-shared', '@transcendence/game-ui'],
};

const withNextIntl = createNextIntlPlugin('./src/modules/i18n/request.ts');
export default withNextIntl(nextConfig);
