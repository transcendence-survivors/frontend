type Key = string | number;

type Join<K, P> = K extends Key ? (P extends Key ? `${K}.${P}` : never) : never;

type DeepKeys<T> = {
	[K in keyof T]: T[K] extends object ? Join<K, DeepKeys<T[K]>> : K;
}[keyof T];

export type AppMessages = typeof import('./en/common.json');
export type MessageKeys = DeepKeys<AppMessages>;
