import type { LooseTFunction, RootTFunction } from '@/modules/i18n/messages/types';
import type { MultiStepFormStep } from '../mutliStep/types';
import { translateFields } from './fields';

const translateMultiStep = <T extends Record<string, unknown>>(
	steps: MultiStepFormStep<T>[],
	t: RootTFunction,
): MultiStepFormStep<T>[] => {
	const translate = t as LooseTFunction;

	return steps.map((step) => ({
		...step,
		title: translate(step.title),
		description: step.description ? translate(step.description) : undefined,
		fields: translateFields(step.fields, t),
	}));
};

export { translateMultiStep };
