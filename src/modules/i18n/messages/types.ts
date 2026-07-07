import { DeepKeys, NestedMessageKeysHelper } from '@/libs/types';
import { useTranslations } from 'next-intl';

type RootTFunction = ReturnType<typeof useTranslations>;
type LooseTFunction = (
	key: string,
	values?: Record<string, string | number | Date>,
) => string;

type AppMessages = typeof import('./en/common.json');
type MessageKeys = DeepKeys<AppMessages>;
type NestedMessageKeys = NestedMessageKeysHelper<AppMessages>;

export type {
	RootTFunction,
	LooseTFunction,
	AppMessages,
	MessageKeys,
	NestedMessageKeys,
};
