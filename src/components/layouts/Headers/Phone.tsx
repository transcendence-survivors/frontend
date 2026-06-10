import Header from '@/components/ui/header';
import NavDrawer from '../NavDrawer';
import Logo from '@/components/icons/Logo';
import I18nLink from '@/modules/i18n/components/I18nLink';

type PhoneHeaderProps = React.HTMLAttributes<HTMLElement> & {};

const PhoneHeader = ({ ...props }: PhoneHeaderProps) => {
	return (
		<Header {...props}>
			<I18nLink href='home'>
				<Logo />
			</I18nLink>
			<div className='ml-auto'>
				<NavDrawer />
			</div>
		</Header>
	);
};

export default PhoneHeader;
