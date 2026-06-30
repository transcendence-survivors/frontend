import type { ReactNode, ComponentProps } from 'react';
import { Link } from '@/modules/i18n/utils/navigation';
import type { ParamRoutes, StaticRoutes } from '../constants/routes';
import type { Locale } from '../constants/locales';
import { getPath } from '../utils/routing';

export type LinkProps = ComponentProps<typeof Link>;

type BaseLinkProps = Omit<LinkProps, 'href'> & {
	locale?: Locale;
	children: Readonly<ReactNode>;
};

type I18nLinkProps =
	| {
			[K in keyof StaticRoutes]: BaseLinkProps & {
				href: K;
				params?: never;
			};
	  }[keyof StaticRoutes]
	| {
			[K in keyof ParamRoutes]: BaseLinkProps & {
				href: K;
				params: ParamRoutes[K];
			};
	  }[keyof ParamRoutes];

const resolveHref = (path: string, params?: Record<string, string | number>): string =>
	params
		? Object.entries(params).reduce(
				(acc, [key, value]) => acc.replace(`:${key}`, String(value)),
				path,
			)
		: path;

export const I18nLink = ({ href, locale, params, children, ...rest }: I18nLinkProps) => (
	<Link href={resolveHref(getPath(href), params)} locale={locale} {...rest}>
		{children}
	</Link>
);

export default I18nLink;
