import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
	allowedDevOrigins: ['10.13.3.2', 'localhost', '127.0.0.1', '::1', '0.0.0.0'],
	reactStrictMode: true,
	images: {
		unoptimized: true, //breaks images display when decided to add click and display in full screen image (because of minio). Need to find a solution or ask about bcaboccel
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
