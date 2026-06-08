import { StepValidationFn, StepValidationResult } from './types';

export const runValidators = async <T>(
	validators: StepValidationFn<T>[] | undefined,
	values: T,
): Promise<StepValidationResult<T>> => {
	if (!validators?.length) {
		return { ok: true };
	}

	const results = await Promise.all(
		validators.map((validator) => validator({ values })),
	);
	const failedResults = results.filter((result) => !result.ok);
	if (!failedResults.length) {
		return { ok: true };
	}

	const errors = failedResults.flatMap((result) => result.errors);
	return { ok: false, errors };
};
