import { type FormAddonsTextKeys } from '../constants/addons';
import { I18nLinkProps } from '@/modules/i18n/components/I18nLink';

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

type FormLabelInternalLinkAddon = {
	variant: 'internal';
	params: I18nLinkProps;
};

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
