import { MessageKeys } from '@/modules/i18n/messages/types';

const PREFIX_KEY = 'forms.addons' as const;

export const FORM_ADDONS = {
	length: `${PREFIX_KEY}.length`,
} as const satisfies Record<string, MessageKeys>;
