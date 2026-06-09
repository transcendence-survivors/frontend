interface FormFieldLengthAddon {
	type: 'length';
	align?: 'block-end' | 'block-start';
	maxLength: number;
}

type FormFieldAddon = FormFieldLengthAddon;

export type { FormFieldLengthAddon, FormFieldAddon };
