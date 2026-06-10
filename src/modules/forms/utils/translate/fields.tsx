import { type FieldValues } from 'react-hook-form';
import { type LooseTFunction, type RootTFunction } from './types';
import { type FormFieldParams } from '../../types/FormFieldParams';

export function translateField<T extends FieldValues>(
	field: FormFieldParams<T>,
	t: RootTFunction,
): FormFieldParams<T> {
	const translate = t as LooseTFunction;

	const base = {
		...field,
		label: translate(field.label),
		placeholder: field.placeholder ? translate(field.placeholder) : undefined,
	};
	switch (field.component) {
		case 'select':
			return {
				...base,
				component: 'select',
				optionsGroups: field.optionsGroups.map((group) => ({
					...group,
					label: group.label ? translate(group.label) : undefined,
					options: group.options.map((opt) => ({
						...opt,
						label: translate(opt.label),
					})),
				})),
			};
		default:
			return base;
	}
}

export function translateFields<T extends FieldValues>(
	fields: FormFieldParams<T>[],
	t: RootTFunction,
): FormFieldParams<T>[] {
	return fields.map((field) => translateField(field, t));
}
