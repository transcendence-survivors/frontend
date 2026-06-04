type Key = string | number;

type Join<K, P> = K extends Key ? (P extends Key ? `${K}.${P}` : never) : never;

type DeepKeys<T> = {
	[K in keyof T]: T[K] extends object ? Join<K, DeepKeys<T[K]>> : K;
}[keyof T];

type NestedMessageKeysHelper<T extends object, Prefix extends string = ''> = {
	[K in keyof T]: K extends string
		? T[K] extends object
			? `${Prefix}${K}` | NestedMessageKeysHelper<T[K], `${Prefix}${K}.`>
			: never
		: never;
}[keyof T];

export type AppMessages = typeof import('./en/common.json');
export type MessageKeys = DeepKeys<AppMessages>;
export type NestedMessageKeys = NestedMessageKeysHelper<AppMessages>;
