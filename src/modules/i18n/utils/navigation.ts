import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';
import { DeepKeys, AppMessages } from '../messages/types';
import { RoutesWithParams, RoutesWithoutParams, ParamRoutes } from '../constants/routes';
import { ReactNode } from 'react';

export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation(routing);

export { default as getRequestConfig } from '../request';

type NavLinkStatic<T extends object> = {
	[K in RoutesWithoutParams]: {
		key: K;
		labelKey: DeepKeys<T>;
	};
}[RoutesWithoutParams];

type NavLinkDynamic<T extends object, TArg> = {
	[K in RoutesWithParams]: {
		key: K;
		labelKey: DeepKeys<T>;
		getHrefParams: (arg: TArg) => ParamRoutes[K];
	};
}[RoutesWithParams];

export type NavLink<T extends object = AppMessages, TArg = unknown> =
	| NavLinkStatic<T>
	| NavLinkDynamic<T, TArg>;

export type IconNavLink<T extends object = AppMessages, TArg = unknown> =
	| (NavLinkStatic<T> & { icon: ReactNode })
	| (NavLinkDynamic<T, TArg> & { icon: ReactNode });
