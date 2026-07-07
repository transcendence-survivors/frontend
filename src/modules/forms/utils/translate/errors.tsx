import {
	LooseTFunction,
	MessageKeys,
	RootTFunction,
} from '@/modules/i18n/messages/types';
import { FieldError } from 'react-hook-form';

type I18nErrorPayload = {
	key: MessageKeys;
	values?: Record<string, string | number | Date>;
};

type ArgTuple = [I18nErrorPayload['key'], I18nErrorPayload['values']];

const i18nError = (...args: ArgTuple): string => {
	const [key, values] = args;
	return JSON.stringify({ key, values } satisfies I18nErrorPayload);
};

const translateError = (t: RootTFunction, error?: FieldError): FieldError | undefined => {
	if (!error?.message) {
		return undefined;
	}

	const translate = t as LooseTFunction;

	try {
		const parsed = JSON.parse(error.message) as Partial<I18nErrorPayload>;

		if (parsed?.key) {
			return {
				...error,
				message: translate(parsed.key, parsed.values),
			};
		}
	} catch {}

	return {
		...error,
		message: translate(error.message),
	};
};

export { i18nError, translateError };
