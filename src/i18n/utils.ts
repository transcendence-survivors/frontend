import { FormField } from '@/components/customs/Form/FormField';
import { useTranslations } from 'next-intl';
import { FieldValues } from 'react-hook-form';

type TFunction = ReturnType<typeof useTranslations>;

export function translateFields<T extends FieldValues>(
	fields: FormField<T>[],
	t: TFunction,
): FormField<T>[] {
	return fields.map((field) => {
		const base = {
			...field,
			label: t(field.label),
			placeholder: field.placeholder ? t(field.placeholder) : undefined,
		};

		switch (field.component) {
			case 'select':
				return {
					...base,
					component: 'select',
					optionsGroups: field.optionsGroups.map((group) => ({
						...group,
						label: group.label ? t(group.label) : undefined,
						options: group.options.map((opt) => ({
							...opt,
							label: t(opt.label),
						})),
					})),
				};

			case 'textarea':
				return {
					...base,
					component: 'textarea',
					addon: field.addon,
				};

			case 'input':
				return {
					...base,
					component: 'input',
					type: field.type,
				};

			case 'checkbox':
				return {
					...base,
					component: 'checkbox',
				};
		}
	});
}
