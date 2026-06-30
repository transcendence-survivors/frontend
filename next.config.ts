import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
	allowedDevOrigins: ['10.13.3.2', 'localhost', '127.0.0.1', '::1', '0.0.0.0'],
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	devIndicators: {
		position: 'bottom-right',
	},
	async rewrites() {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		return [
			{
				source: '/api/:path*',
				destination: `${apiUrl}/:path*`,
			},
		];
	},
};

const withNextIntl = createNextIntlPlugin('./src/modules/i18n/request.ts');
export default withNextIntl(nextConfig);
