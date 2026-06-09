import { FieldValues, Path } from 'react-hook-form';
import { FormFieldAddon } from './FormFieldAddons';

interface FormInputPassword {
	variant: 'password';
}

interface FormInputEmail {
	variant: 'email';
}

interface FormInputPhone {
	variant: 'phone';
	format?: string;
}

interface FormInputDate {
	variant: 'date';
}

interface FormInputDefault {
	variant?: 'default';
	type?: string;
}

type FormInput = {
	component: 'input';
} & (
	| FormInputPassword
	| FormInputEmail
	| FormInputPhone
	| FormInputDate
	| FormInputDefault
);

interface FormTextarea {
	component: 'textarea';
	addon?: FormFieldAddon;
}

interface FormOption {
	value: string;
	label: string;
}

interface FormGroup {
	label?: string;
	options: FormOption[];
}

interface FormSelect {
	component: 'select';
	optionsGroups: FormGroup[];
}

interface FormCheckBox {
	component: 'checkbox';
}

interface FormFieldBase<T extends FieldValues> {
	name: Path<T>;
	label: string;
	placeholder?: string;
	required?: boolean;
}
type FormFieldParams<T extends FieldValues> = FormFieldBase<T> &
	(FormInput | FormTextarea | FormSelect | FormCheckBox);

export type { FormFieldBase, FormFieldParams };
