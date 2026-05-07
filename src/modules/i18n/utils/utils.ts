import type { FieldValues } from 'react-hook-form';
import type { useTranslations } from 'next-intl';
import type { FieldError } from 'react-hook-form';
import type { MessageKeys } from '../messages/types';
import { FormFieldG } from '@/modules/forms';

type RootTFunction = ReturnType<typeof useTranslations>;

type I18nErrorPayload = {
	key: MessageKeys;
	values?: Record<string, string | number>;
};

type ArgTuple = [I18nErrorPayload['key'], I18nErrorPayload['values']];

export const i18nError = (...args: ArgTuple): string => {
	const [key, values] = args;
	return JSON.stringify({ key, values } satisfies I18nErrorPayload);
};

export const translateError = (
	t: RootTFunction,
	error?: FieldError,
): FieldError | undefined => {
	if (!error?.message) return undefined;

	const translate = t as LooseTFunction;

	try {
		const parsed = JSON.parse(error.message) as Partial<I18nErrorPayload>;

		if (parsed?.key) {
			return {
				...error,
				message: translate(parsed.key, parsed.values),
			};
		}
	} catch {}

	return {
		...error,
		message: translate(error.message),
	};
};

type LooseTFunction = (
	key: string,
	values?: Record<string, string | number | Date>,
) => string;

export function translateFields<T extends FieldValues>(
	fields: FormFieldG<T>[],
	t: RootTFunction,
): FormFieldG<T>[] {
	const translate = t as unknown as LooseTFunction;

	return fields.map((field) => {
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
			case 'textarea':
				return { ...base, component: 'textarea', addon: field.addon };
			case 'input':
				return { ...base, component: 'input', type: field.type };
			case 'checkbox':
				return { ...base, component: 'checkbox' };
		}
	});
}
