import { QueryClient, QueryKey } from '@tanstack/react-query';

export type InvalidateQueriesOptions = {
	delay?: number;
	mode?: 'debounce' | 'throttle' | 'instant';
	reset?: boolean;
	invalidateQueriesOptions?: Parameters<QueryClient['invalidateQueries']>[0];
};

interface DeferredTask {
	timeout: NodeJS.Timeout;
	resolvers: Array<{
		resolve: () => void;
		reject: (reason?: unknown) => void;
	}>;
}

const debounceTasks = new Map<string, DeferredTask>();
const throttleLastRun = new Map<string, number>();

export const invalidateQueries = (
	queryClient: QueryClient,
	queryKey: QueryKey,
	options: InvalidateQueriesOptions = {},
): Promise<void> => {
	const {
		delay = 300,
		mode = 'debounce',
		reset = false,
		invalidateQueriesOptions,
	} = options;

	const keyString = JSON.stringify(queryKey);

	const performInvalidation = async () => {
		await queryClient.cancelQueries({ queryKey, exact: false });
		if (reset) {
			await queryClient.resetQueries({
				queryKey,
				exact: false,
			});
			return;
		}
		await queryClient.invalidateQueries({
			queryKey,
			...invalidateQueriesOptions,
		});
	};

	if (mode === 'instant') {
		const existingTask = debounceTasks.get(keyString);
		if (existingTask) {
			clearTimeout(existingTask.timeout);
			existingTask.resolvers.forEach((r) => r.resolve());
			debounceTasks.delete(keyString);
		}
		throttleLastRun.delete(keyString);
		return performInvalidation();
	}

	return new Promise<void>((resolve, reject) => {
		if (mode === 'throttle') {
			const now = Date.now();
			const lastRun = throttleLastRun.get(keyString) || 0;

			if (now - lastRun >= delay) {
				throttleLastRun.set(keyString, now);
				performInvalidation().then(resolve).catch(reject);

				setTimeout(() => {
					if (Date.now() - (throttleLastRun.get(keyString) || 0) >= delay) {
						throttleLastRun.delete(keyString);
					}
				}, delay + 50);
				return;
			}

			const existingTask = debounceTasks.get(keyString);
			if (existingTask) {
				existingTask.resolvers.push({ resolve, reject });
			} else {
				const remainingTime = delay - (now - lastRun);
				const resolvers = [{ resolve, reject }];

				const timeout = setTimeout(async () => {
					throttleLastRun.set(keyString, Date.now());
					try {
						await performInvalidation();
						resolvers.forEach((r) => r.resolve());
					} catch (err) {
						resolvers.forEach((r) => r.reject(err));
					} finally {
						debounceTasks.delete(keyString);
						setTimeout(() => {
							throttleLastRun.delete(keyString);
						}, delay);
					}
				}, remainingTime);

				debounceTasks.set(keyString, { timeout, resolvers });
			}
			return;
		}

		const existingTask = debounceTasks.get(keyString);
		const resolvers = existingTask ? existingTask.resolvers : [];
		resolvers.push({ resolve, reject });

		if (existingTask) {
			clearTimeout(existingTask.timeout);
		}

		const timeout = setTimeout(async () => {
			try {
				await performInvalidation();
				resolvers.forEach((r) => r.resolve());
			} catch (err) {
				resolvers.forEach((r) => r.reject(err));
			} finally {
				debounceTasks.delete(keyString);
			}
		}, delay);

		debounceTasks.set(keyString, { timeout, resolvers });
	});
};

export function clearPendingInvalidations(): void {
	debounceTasks.forEach((task) => {
		clearTimeout(task.timeout);
		task.resolvers.forEach((r) => r.resolve());
	});
	debounceTasks.clear();
	throttleLastRun.clear();
}
