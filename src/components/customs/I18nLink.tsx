import type { ReactNode, ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import { getPath, type RouteKey, type Locale } from '@/i18n/routing';


export type I18nLinkProps = ComponentProps<typeof Link> & {
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
	const hrefPath = getPath(href);

	return (
		<Link href={hrefPath} locale={locale} {...rest}>
			{children}
		</Link>
	);
}


export default I18nLink;


