import { MessageKeys } from '@/modules/i18n/messages/types';

const PREFIX_KEY = 'forms.addons' as const;

export const FORM_ADDONS = {
	length: `${PREFIX_KEY}.length`,
	forgot_password: `auth.signin.forgotPassword`,
} as const satisfies Record<string, MessageKeys>;

export type FormAddonsTextKeys = (typeof FORM_ADDONS)[keyof typeof FORM_ADDONS];
