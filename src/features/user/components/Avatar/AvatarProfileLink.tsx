import I18nLink from '@/modules/i18n/components/I18nLink';
import AvatarProfile from './AvatarProfile';
import { AvatarProfileProps } from './AvatarProfile';

interface AvatarProfileLinkProps {
	username: string;
	avatar: AvatarProfileProps;
}

const AvatarProfileLink = ({ username, avatar }: AvatarProfileLinkProps) => {
	return (
		<I18nLink href='profile'>
			<AvatarProfile {...avatar} />
		</I18nLink>
	);
};

export default AvatarProfileLink;
