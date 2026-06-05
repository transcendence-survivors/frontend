import { FieldValues } from 'react-hook-form';
import { FormFieldG } from '../../components/Base/FormField';
import { LooseTFunction, RootTFunction } from './types';

export function translateField<T extends FieldValues>(
	field: FormFieldG<T>,
	t: RootTFunction,
): FormFieldG<T> {
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
	fields: FormFieldG<T>[],
	t: RootTFunction,
): FormFieldG<T>[] {
	return fields.map((field) => translateField(field, t));
}
