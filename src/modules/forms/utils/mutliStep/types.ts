import { FieldValues } from 'react-hook-form';
import { FormFieldG } from '../../components/Base/FormField';

interface StepValidationSuccess {
	ok: true;
}

interface StepValidationFailure<T> {
	ok: false;
	message: string;
	field: keyof T;
}

export type StepValidationResult<T> = StepValidationSuccess | StepValidationFailure<T>;

export interface StepValidationContext<T> {
	values: T;
}

export type StepValidationFn<T> = (
	ctx: StepValidationContext<T>,
) => Promise<StepValidationResult<T>> | StepValidationResult<T>;

export interface MultiStepFormStep<T extends FieldValues> {
	title: string;
	description?: string;
	fields: FormFieldG<T>[];
	validators?: StepValidationFn<T>[];
}
