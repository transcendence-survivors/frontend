import { ApiSuccess, isApiError } from '@/libs/api';
import getUserByUsername from '../../api/get.api';
import { User } from '../../schemas/user.schema';
import ProfileHeader from './ProfileHeader';

const user: User = {
	id: '1',
	username: 'batman',
	displayName: 'Bruce Wayne',
	email: 'batman@gothamcity.com',
	birthdate: new Date('1980-01-01'),
	firstName: 'Bruce',
	lastName: 'Wayne',
	gender: 'MALE',
	role: 'USER',
	bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti adipisci veniam nobis quis, maiores quae asperiores deleniti iusto impedit, earum nesciunt, dolore ullam dolor reiciendis nisi sequi nihil fugit a.',
	avatarUrl: 'https://upload.wikimedia.org/wikipedia/fr/c/ca/Batman_logo.png',
	bannerUrl: 'https://i.pinimg.com/736x/fc/49/f1/fc49f199b54cb6393ad246d6bb7ed95b.jpg',
};

interface ProfileHeaderProps extends React.HTMLAttributes<HTMLElement> {
	username: string;
}

const ProfileHeaderServer = async ({ username, ...props }: ProfileHeaderProps) => {
	let res = await getUserByUsername(username);
	if (isApiError(res)) {
		// notFound();
		res = { ...res, data: user, status: 'success' } as ApiSuccess<User>;
	}
	return <ProfileHeader user={res.data} {...props} />;
};

export default ProfileHeaderServer;
