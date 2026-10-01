'use client';

import { useTranslations } from 'next-intl';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { BookOpen, Skull, Sparkles } from 'lucide-react';
import { cn } from '@/libs/utils';
import { AppMessages } from '@/modules/i18n/messages/types';
import { NavLink, usePathname } from '@/modules/i18n/utils/navigation';
import { getBasePath } from '@/modules/i18n/utils/routing';
import { useMemo } from 'react';

type WikiNavLink = NavLink<AppMessages['wiki']> & {
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const links = [
	{
		key: 'wiki',
		labelKey: 'nav.overview',
		icon: Sparkles,
	},
	{
		key: 'wikiArsenal',
		labelKey: 'nav.arsenal',
		icon: BookOpen,
	},
	{
		key: 'wikiBestiary',
		labelKey: 'nav.bestiary',
		icon: Skull,
	},
] as const satisfies WikiNavLink[];

const WikiNav = () => {
	const t = useTranslations('wiki');
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

		return bestMatch ? bestMatch.key : 'wiki';
	}, [path]);

	return (
		<nav className='flex items-center gap-2 p-1 bg-muted/40 border border-border rounded-xl w-fit mx-auto lg:mx-0'>
			{links.map((link) => {
				const Icon = link.icon;
				const isActive = link.key === activeKey;

				return (
					<I18nLink
						key={link.key}
						href={link.key}
						className={cn(
							'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
							isActive
								? 'bg-background text-primary shadow-sm border border-border/50'
								: 'text-muted-foreground hover:text-foreground hover:bg-muted',
						)}>
						<Icon className={'size-4 text-current'} />
						<span>{t(link.labelKey)}</span>
					</I18nLink>
				);
			})}
		</nav>
	);
};

export default WikiNav;
