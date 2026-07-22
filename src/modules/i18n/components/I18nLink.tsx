import type { ReactNode, ComponentProps } from 'react';
import { Link } from '@/modules/i18n/utils/navigation';
import type { ParamRoutes, StaticRoutes } from '../constants/routes';
import type { Locale } from '../constants/locales';
import { getBasePath } from '../utils/routing';

export type LinkProps = ComponentProps<typeof Link>;

type BaseLinkProps = Omit<LinkProps, 'href'> & {
	locale?: Locale;
	children?: Readonly<ReactNode>;
	queryParams?: Record<string, string | number>;
};

export type I18nLinkProps =
	| {
			[K in keyof StaticRoutes]: BaseLinkProps & {
				href: K;
				hrefParams?: never;
			};
	  }[keyof StaticRoutes]
	| {
			[K in keyof ParamRoutes]: BaseLinkProps & {
				href: K;
				hrefParams: ParamRoutes[K];
			};
	  }[keyof ParamRoutes];

export const resolveHref = (
	path: string,
	params?: Record<string, string | number>,
): string =>
	params
		? Object.entries(params).reduce(
				(acc, [key, value]) => acc.replace(`:${key}`, String(value)),
				path,
			)
		: path;

export const I18nLink = ({
	href,
	locale,
	hrefParams,
	children,
	queryParams,
	...rest
}: I18nLinkProps) => (
	<Link
		href={{
			pathname: resolveHref(getBasePath(href), hrefParams),
			query: queryParams,
		}}
		locale={locale}
		{...rest}>
		{children}
	</Link>
);

export default I18nLink;
