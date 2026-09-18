'use client';

import { clearPendingInvalidations } from '@/libs/api/helpers/queryInvalidator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type QuerryProviderProps = {
	children: React.ReactNode;
};

const QuerryProvider = ({ children }: QuerryProviderProps) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 5,
						gcTime: 1000 * 60 * 30,
						refetchOnWindowFocus: false,
					},
				},
			}),
	);

	useEffect(() => {
		return () => {
			clearPendingInvalidations();
		};
	}, []);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export { QuerryProvider };
