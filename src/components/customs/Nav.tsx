import { Link } from "@/i18n/navigation";
import { getRoute, RouteKey } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface NavLink {
	key: RouteKey;
	labelKey: string;
}

const navLinks: NavLink[] = [
	{ key: 'home', labelKey: 'home' },
	{ key: 'game', labelKey: 'game' },
	{ key: 'leaderboard', labelKey: 'leaderboard' },
	{ key: 'profile', labelKey: 'profile' },
	{ key: 'settings', labelKey: 'settings' },
];

interface NavProps extends React.HTMLAttributes<HTMLElement> {
	className?: string;
}

const Nav = ({ ...props }: NavProps) => {
	const t = useTranslations("nav");

	return (
		<nav {...props}>
			<ul>
				{navLinks.map((link) => (
					<li key={link.key}>
						<Link href={getRoute(link.key)}>{t(`${link.labelKey}`)}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default Nav;