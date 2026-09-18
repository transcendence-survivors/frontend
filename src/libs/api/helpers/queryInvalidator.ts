import { QueryClient, QueryKey } from '@tanstack/react-query';

export type InvalidateQueriesOptions = {
	delay?: number;
	mode?: 'debounce' | 'throttle' | 'instant';
};

const debounceTimers = new Map<string, NodeJS.Timeout>();
const throttleLastRun = new Map<string, number>();

export function invalidateQueries(
	queryClient: QueryClient,
	queryKey: QueryKey,
	options: InvalidateQueriesOptions = {},
): void {
	const { delay = 300, mode = 'debounce' } = options;
	const keyString = JSON.stringify(queryKey);

	if (mode === 'instant') {
		if (debounceTimers.has(keyString)) {
			clearTimeout(debounceTimers.get(keyString));
			debounceTimers.delete(keyString);
		}
		throttleLastRun.delete(keyString);
		queryClient.invalidateQueries({ queryKey });
		return;
	}

	if (mode === 'throttle') {
		const now = Date.now();
		const lastRun = throttleLastRun.get(keyString) || 0;

		if (now - lastRun >= delay) {
			throttleLastRun.set(keyString, now);
			queryClient.invalidateQueries({ queryKey });

			setTimeout(() => {
				if (Date.now() - (throttleLastRun.get(keyString) || 0) >= delay) {
					throttleLastRun.delete(keyString);
				}
			}, delay + 50);
		} else if (!debounceTimers.has(keyString)) {
			const remainingTime = delay - (now - lastRun);

			const timeout = setTimeout(() => {
				throttleLastRun.set(keyString, Date.now());
				queryClient.invalidateQueries({ queryKey });
				debounceTimers.delete(keyString);

				setTimeout(() => {
					throttleLastRun.delete(keyString);
				}, delay);
			}, remainingTime);

			debounceTimers.set(keyString, timeout);
		}
		return;
	}

	if (debounceTimers.has(keyString)) {
		clearTimeout(debounceTimers.get(keyString));
	}

	const timeout = setTimeout(() => {
		console.log(`Invalidating queries for key: ${keyString}`);
		queryClient.invalidateQueries({ queryKey });
		debounceTimers.delete(keyString);
	}, delay);

	debounceTimers.set(keyString, timeout);
}

export function clearPendingInvalidations(): void {
	debounceTimers.forEach((timeout) => clearTimeout(timeout));
	debounceTimers.clear();
	throttleLastRun.clear();
}
