import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(['development', 'test', 'production']),
		JWT_SECRET: z.string(),
		API_INTERNAL: z
			.url()
			.transform((val) => (val.endsWith('/') ? val.slice(0, -1) : val)),
	},
	client: {
		NEXT_PUBLIC_SOCKET_URL: z.url(),
		NEXT_PUBLIC_API_URL: z
			.url()
			.transform((val) => (val.endsWith('/') ? val.slice(0, -1) : val)),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		JWT_SECRET: process.env.JWT_SECRET,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
		API_INTERNAL: process.env.API_INTERNAL,
	},
});
