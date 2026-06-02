import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';
import { RouteKey } from '../constants/routes';
import { AppMessages } from '../messages/types';

export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation(routing);

export { default as getRequestConfig } from '../request';

export interface NavLink {
	key: RouteKey;
	labelKey: keyof AppMessages['nav'];
}
