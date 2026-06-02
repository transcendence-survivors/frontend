import { AvatarDropdown } from '@/features/user/components/Avatar/AvatarDropDown';
import AvatarProfileLink from '@/features/user/components/Avatar/AvatarProfileLink';
import { cn } from '@/libs/utils';
import LocaleSwitcher from '@/modules/i18n/components/LocaleSwitcher';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header = ({ className, ...props }: HeaderProps) => {
	return (
		<header
			className={cn(
				'bg-background text-foreground flex items-center justify-between px-6\
				border-b border-border',
				className,
			)}
			{...props}>
			<nav className='py-4 flex justify-end w-full'>
				<LocaleSwitcher />
			</nav>
			<AvatarDropdown
				avatar={{ img: { src: '/avatar.png', alt: 'User Avatar' } }}
			/>
		</header>
	);
};

export default Header;
