import { AvatarDropdown } from '@/features/user/components/Avatar/AvatarDropDown';
import { cn } from '@/libs/utils';
import Logo from '../icons/Logo';
import I18nLink from '@/modules/i18n/components/I18nLink';
import NavDrawer from './NavDrawer';

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
			<I18nLink href='home'>
				<Logo />
			</I18nLink>
			<div className='ml-auto'>
				<AvatarDropdown
					avatar={{ img: { src: '/avatar.png', alt: 'User Avatar' } }}
				/>
			</div>
		</header>
	);
};

const PhoneHeader = ({ className, ...props }: HeaderProps) => {
	return (
		<header
			className={cn(
				'bg-background text-foreground flex items-center justify-between px-6\
				border-b border-border',
				className,
			)}
			{...props}>
			<NavDrawer />
		</header>
	);
};

export default PhoneHeader;
