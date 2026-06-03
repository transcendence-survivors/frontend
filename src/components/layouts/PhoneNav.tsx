import I18nLink from '@/modules/i18n/components/I18nLink';
import { NavLink } from '@/modules/i18n/utils/navigation';
import { Home, Search, User } from 'lucide-react';
import { Button } from '../ui/button';

interface Links extends NavLink {
	icons: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const navLinks: Links[] = [
	{ key: 'settings', icons: Search, labelKey: 'settings' },
	{ key: 'home', icons: Home, labelKey: 'home' },
	{ key: 'profile', icons: User, labelKey: 'profile' },
];

const PhoneNav = () => {
	return (
		<nav className='fixed bottom-0 left-0 right-0 bg-background border-t border-border'>
			<ul className='flex justify-around p-2'>
				{navLinks.map((link) => (
					<li key={link.key}>
						<Button
							variant='ghost'
							size='icon-lg'
							className='rounded-full'
							asChild>
							<I18nLink href={link.key}>
								<link.icons className='w-full' />
							</I18nLink>
						</Button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default PhoneNav;
