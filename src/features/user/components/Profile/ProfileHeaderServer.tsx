import { ApiSuccess, isApiError } from '@/libs/api';
import getUserByUsername from '../../api/get';
import { type UserFacade } from '@user/type';
import ProfileHeader from './ProfileHeader';
import { notFound } from 'next/navigation';

const user: UserFacade = {
	id: '1',
	username: 'batman',
	displayName: 'Bruce Wayne',
	birthdate: new Date('1980-01-01'),
	bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti adipisci veniam nobis quis, maiores quae asperiores deleniti iusto impedit, earum nesciunt, dolore ullam dolor reiciendis nisi sequi nihil fugit a.',
	avatarUrl: 'https://upload.wikimedia.org/wikipedia/fr/c/ca/Batman_logo.png',
	coverImageUrl:
		'https://i.pinimg.com/736x/fc/49/f1/fc49f199b54cb6393ad246d6bb7ed95b.jpg',
};

interface ProfileHeaderProps extends React.HTMLAttributes<HTMLElement> {
	username: string;
}

const ProfileHeaderServer = async ({ username, ...props }: ProfileHeaderProps) => {
	const res = await getUserByUsername(username);
	if (isApiError(res)) {
		notFound();
	}
	return <ProfileHeader user={res.data} {...props} />;
};

export default ProfileHeaderServer;
