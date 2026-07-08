'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			gcTime: 1000 * 60 * 30,
		},
	},
});

type QuerryProviderProps = {
	children: React.ReactNode;
};

const QuerryProvider = ({ children }: QuerryProviderProps) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export { QuerryProvider, queryClient };
