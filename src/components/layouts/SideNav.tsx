import { useTranslations } from 'next-intl';
import { Button } from '@ui/button';
import { cn } from '@libs/utils';
import { AppMessages } from '@i18n/messages/types';
import { RouteKey } from '@i18n/constants/routes';
import I18nLink from '@i18n/components/I18nLink';

interface NavLink {
	key: RouteKey;
	labelKey: keyof AppMessages['nav'];
}

const navLinks: NavLink[] = [
	{ key: 'home', labelKey: 'home' },
	{ key: 'game', labelKey: 'game' },
	{ key: 'leaderboard', labelKey: 'leaderboard' },
	{ key: 'profile', labelKey: 'profile' },
	{ key: 'settings', labelKey: 'settings' },
	{ key: 'posts', labelKey: 'posts' },
];

const legals: NavLink[] = [
	{ key: 'home', labelKey: 'legal' },
	{ key: 'profile', labelKey: 'terms' },
	{ key: 'posts', labelKey: 'privacy' },
];

interface NavProps extends React.HTMLAttributes<HTMLElement> {
	align?: 'left' | 'center' | 'right';
	linkWidth?: 'fit' | 'full';
}

type Align = NonNullable<NavProps['align']>;
type LinkWidth = NonNullable<NavProps['linkWidth']>;

type AlignClass = Record<Align, string>;
type LinkWidthClass = Record<LinkWidth, string>;

const alignX = {
	left: 'justify-start',
	center: 'justify-center',
	right: 'justify-end',
} satisfies AlignClass;

const marginX = {
	left: 'mr-auto',
	center: 'mx-auto',
	right: 'ml-auto',
} satisfies AlignClass;

const alignY = {
	left: 'items-start',
	center: 'items-center',
	right: 'items-end',
} satisfies AlignClass;

const linkWidthClass = {
	fit: 'w-auto',
	full: 'w-full',
} satisfies LinkWidthClass;

const SideNav = ({
	className,
	align = 'left',
	linkWidth = 'fit',
	...props
}: NavProps) => {
	const t = useTranslations('nav');

	return (
		<nav
			className={cn('flex flex-col justify-between gap-20 h-full', className)}
			{...props}>
			<ul className={`flex space-y-4 flex-col ${alignY[align]}`}>
				{navLinks.map((link) => (
					<li key={link.key} className={`${linkWidthClass[linkWidth]}`}>
						<Button
							variant='ghost'
							className={`w-full ${alignX[align]}`}
							asChild>
							<I18nLink href={link.key}>{t(link.labelKey)}</I18nLink>
						</Button>
					</li>
				))}
			</ul>
			<ul className={`flex flex-wrap lowercase ${alignY[align]}`}>
				{legals.map((link) => (
					<li
						key={link.key}
						className={`${linkWidthClass[linkWidth]} ${marginX[align]}`}>
						<Button
							variant='link'
							className={`${alignX[align]} text-muted-foreground text-xs px-1 h-auto`}
							asChild>
							<I18nLink href={link.key}>{t(link.labelKey)}</I18nLink>
						</Button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default SideNav;
