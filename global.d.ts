import 'next-intl';

import messages from '@/modules/i18n/messages/en/common.json';

type Messages = typeof messages;

declare module 'next-intl' {
	interface AppConfig {
		Messages: Messages;
	}
}

export {};
