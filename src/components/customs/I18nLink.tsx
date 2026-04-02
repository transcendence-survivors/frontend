import type { ReactNode, ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import { getPath, type RouteKey, type Locale } from '@/i18n/routing';

type LinkProps = ComponentProps<typeof Link>;

type I18nLinkProps = Omit<LinkProps, 'href'> & {
	href: RouteKey;
	locale?: Locale;
	children: Readonly<ReactNode>;
};

export const I18nLink = ({
	href,
	locale,
	children,
	...rest
}: I18nLinkProps) => {
	return (
		<Link
			href={getPath(href) as LinkProps['href']}
			locale={locale}
			{...rest}
		>
			{children}
		</Link>
	);
};

export default I18nLink;
