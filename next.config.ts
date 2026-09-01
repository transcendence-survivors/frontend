import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import os from 'os';

function getLocalIPs(): string[] {
	const ips: string[] = [];
	const interfaces = os.networkInterfaces();
	for (const name of Object.keys(interfaces)) {
		for (const iface of interfaces[name] ?? []) {
			if (iface.family === 'IPv4' && !iface.internal) {
				ips.push(iface.address);
			}
		}
	}
	return ips;
}

const nextConfig: NextConfig = {
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
