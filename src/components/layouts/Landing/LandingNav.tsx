'use client';

import { useMemo, Fragment } from 'react';
import { useTranslations } from 'next-intl';
import { NavLink, usePathname } from '@i18n/utils/navigation';
import { getBasePath } from '@/modules/i18n/utils/routing';
import { I18nLink } from '@/modules/i18n/components/I18nLink';
import { AppMessages } from '@/modules/i18n/messages/types';
import { DrawerClose } from '@/components/ui/drawer';
import { cn } from '@/libs/utils';

interface LandingNavProps extends React.HTMLAttributes<HTMLUListElement> {
	isDrawer?: boolean;
}

export const links = [
	{ key: 'home', labelKey: 'home' },
	{ key: 'lore', labelKey: 'lore' },
	{ key: 'wiki', labelKey: 'wiki' },
	{ key: 'support', labelKey: 'support' },
] as const satisfies NavLink<AppMessages['nav']>[];

export type KeyNavItem = (typeof links)[number]['key'];

export default function LandingNav({ isDrawer, className, ...props }: LandingNavProps) {
	const t = useTranslations('nav');
	const path = usePathname();

	const activeKey = useMemo(() => {
		const bestMatch = links
			.filter((link) => path.startsWith(getBasePath(link.key)))
			.reduce<(typeof links)[number] | null>((longest, link) => {
				if (!longest) return link;
				return getBasePath(link.key).length > getBasePath(longest.key).length
					? link
					: longest;
			}, null);

		return bestMatch ? bestMatch.key : null;
	}, [path]);

	const { Tag, tagProps } = useMemo(() => {
		return {
			Tag: isDrawer ? DrawerClose : Fragment,
			tagProps: isDrawer ? { asChild: true } : {},
		};
	}, [isDrawer]);

	return (
		<ul className={cn('flex flex-col gap-1 px-4', className)} {...props}>
			{links.map(({ key, labelKey }) => {
				const isActive = activeKey === key;

				return (
					<li key={key}>
						<Tag {...tagProps}>
							<I18nLink
								href={key}
								className={cn(
									'block rounded-sm px-3 py-2 transition-colors',
									isActive
										? 'text-primary font-medium'
										: 'text-muted-foreground hover:bg-muted hover:text-foreground',
								)}>
								{t(labelKey)}
							</I18nLink>
						</Tag>
					</li>
				);
			})}
		</ul>
	);
}
