import Logo from '@/components/icons/Logo';
import Header from '@/components/ui/header';
import { AvatarDropdown } from '@/features/user/components/Avatar/AvatarDropDown';
import I18nLink from '@/modules/i18n/components/I18nLink';

type PcHeaderProps = React.HTMLAttributes<HTMLElement> & {};

const PcHeader = ({ ...props }: PcHeaderProps) => {
	return (
		<Header {...props}>
			<I18nLink href='home'>
				<Logo />
			</I18nLink>
			<div className='ml-auto'>
				<AvatarDropdown
					avatar={{ img: { src: '/avatar.png', alt: 'User Avatar' } }}
				/>
			</div>
		</Header>
	);
};

export default PcHeader;
