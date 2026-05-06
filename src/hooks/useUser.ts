import { useQuery } from '@tanstack/react-query';
import { User } from '@/libs/zod/user.schema';

const templateUser: User = {
	id: 'uuid',
	birthday: new Date(),
	email: '',
	firstName: '',
	lastName: '',
	username: '',
	displayName: '',
	role: 'USER',
	createdAt: new Date(),
	updatedAt: new Date(),
};

const fetchUser = async () => {
	const fakePromise = new Promise<User>((resolve) => {
		setTimeout(() => {
			resolve(templateUser);
		}, 1000);
	});
	return await fakePromise;
};

const useUser = () => {
	return useQuery({
		queryKey: ['user'],
		queryFn: fetchUser,
		retry: false,
	});
};

export default useUser;
