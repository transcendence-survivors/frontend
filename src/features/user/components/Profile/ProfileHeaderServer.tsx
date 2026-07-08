import { isApiError } from '@/libs/api';
import profileByUsername from '../../api/profile';
import ProfileHeader from './ProfileHeader';
import { notFound } from 'next/navigation';

interface ProfileHeaderProps extends React.HTMLAttributes<HTMLElement> {
	username: string;
}

const ProfileHeaderServer = async ({ username, ...props }: ProfileHeaderProps) => {
	const res = await profileByUsername(username);
	if (isApiError(res)) {
		notFound();
	}
	return <ProfileHeader user={res.data} {...props} />;
};

export default ProfileHeaderServer;
