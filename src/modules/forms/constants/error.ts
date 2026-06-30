import type { MessageKeys } from '@/modules/i18n/messages/types';

const PREFIX_KEY = 'forms.error' as const;

export const FORM_ERRORS = {
	required: `${PREFIX_KEY}.required`,

	email: `${PREFIX_KEY}.email`,
	string: `${PREFIX_KEY}.string`,
	number: `${PREFIX_KEY}.number`,
	date: `${PREFIX_KEY}.date`,
	boolean: `${PREFIX_KEY}.boolean`,
	enum: `${PREFIX_KEY}.enum`,
	phone: `${PREFIX_KEY}.phone`,
	select: `${PREFIX_KEY}.select`,

	minLength: `${PREFIX_KEY}.minLength`,
	maxLength: `${PREFIX_KEY}.maxLength`,

	lowercase: `${PREFIX_KEY}.lowercase`,
	uppercase: `${PREFIX_KEY}.uppercase`,

	mustAcceptTerms: `${PREFIX_KEY}.mustAcceptTerms`,
	passwordsMustMatch: `${PREFIX_KEY}.password_match`,
	password_uppercase: `${PREFIX_KEY}.password_uppercase`,
	password_lowercase: `${PREFIX_KEY}.password_lowercase`,
	password_number: `${PREFIX_KEY}.password_number`,
	password_special: `${PREFIX_KEY}.password_special`,

	age_restriction: `${PREFIX_KEY}.age_restriction`,
	email_already_in_use: `${PREFIX_KEY}.email_already_in_use`,
	username_already_in_use: `${PREFIX_KEY}.username_already_in_use`,
	user_already_exists: `${PREFIX_KEY}.user_already_exists`,

	invalid_credentials: `${PREFIX_KEY}.invalid_credentials`,
	invalid_email: `${PREFIX_KEY}.invalid_email`,
	invalid_token: `${PREFIX_KEY}.invalid_token`,
	internal_server_error: `${PREFIX_KEY}.internal_server_error`,
} as const satisfies Record<string, MessageKeys>;
