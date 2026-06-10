import { FieldValues } from 'react-hook-form';
import { FormFieldParams } from '../../types/FormFieldParams';

interface StepValidationSuccess {
	ok: true;
}

export interface StepValidationFieldError<T> {
	field: keyof T | 'form' | 'root';
	message: string;
}

interface StepValidationFailure<T> {
	ok: false;
	errors: StepValidationFieldError<T>[];
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
	fields: FormFieldParams<T>[];
	validators?: StepValidationFn<T>[];
}
