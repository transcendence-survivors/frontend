import { type RouteKey } from '@/modules/i18n/constants/routes';
import { type FormAddonsTextKeys } from '../constants/addons';

interface FormFieldLengthAddon {
	type: 'length';
	align?: 'block-end' | 'block-start';
	maxLength: number;
}

interface FormLabelExternalLinkAddon {
	variant: 'external';
	target?: '_blank' | '_self' | '_parent' | '_top';
	href: string;
}

interface FormLabelInternalLinkAddon {
	variant: 'internal';
	href: RouteKey;
}

type FormLabelLinkAddon = {
	type: 'link';
	as: 'button' | 'text';
	text: FormAddonsTextKeys;
} & (FormLabelInternalLinkAddon | FormLabelExternalLinkAddon);

type FormFieldAddon = FormFieldLengthAddon;
type FormLabelAddon = FormLabelLinkAddon;

export type {
	FormFieldLengthAddon,
	FormLabelLinkAddon,
	FormLabelExternalLinkAddon,
	FormLabelInternalLinkAddon,
	FormLabelAddon,
	FormFieldAddon,
};
