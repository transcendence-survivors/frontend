import type { MessageKeys } from '@/modules/i18n/messages/types';

const PREFIX_KEY = 'forms.error' as const;

export const FORM_ERRORS = {
	required: `${PREFIX_KEY}.required`,
	type: `${PREFIX_KEY}.invalidType`,
	minLength: `${PREFIX_KEY}.minLength`,
	maxLength: `${PREFIX_KEY}.maxLength`,
	email: `${PREFIX_KEY}.email`,
	email_already_in_use: `${PREFIX_KEY}.email_already_in_use`,
	username_already_in_use: `${PREFIX_KEY}.username_already_in_use`,
	select: `${PREFIX_KEY}.select`,
	mustAcceptTerms: `${PREFIX_KEY}.mustAcceptTerms`,
	passwordsMustMatch: `${PREFIX_KEY}.passwordsMustMatch`,
	internal_server_error: `${PREFIX_KEY}.internal_server_error`,
	phone: `${PREFIX_KEY}.phone`,
	age_restriction: `${PREFIX_KEY}.age_restriction`,
} as const satisfies Record<string, MessageKeys>;
