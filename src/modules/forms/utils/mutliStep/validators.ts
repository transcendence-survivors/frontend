import { StepValidationFn, StepValidationResult } from './types';

export const runValidators = async <T>(
	validators: StepValidationFn<T>[] | undefined,
	values: T,
): Promise<StepValidationResult<T>> => {
	if (!validators?.length) {
		return { ok: true as const };
	}

	for (const validator of validators) {
		const result = await validator({ values });

		if (!result.ok) {
			return result;
		}
	}

	return { ok: true as const };
};
