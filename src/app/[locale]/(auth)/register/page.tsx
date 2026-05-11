'use client';

import useUser from '@auth/hooks/useUser';
import { useSessionActions } from '@auth/stores/session';

const RegisterPage = () => {
	const { data, isLoading, isError } = useUser();
	const { setSession } = useSessionActions();

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError || !data) {
		return <div>Error loading user data.</div>;
	}

	const user = data;
	setSession({
		user: user,
		accessToken: '',
	});

	return (
		<div className='container mx-auto py-10'>
			<h1 className='text-2xl font-bold mb-6'>Register</h1>
			{user ? (
				<div>
					<p>Welcome back, {user.displayName}!</p>
					<p>Your email: {user.email}</p>
				</div>
			) : (
				<p>Please register to access more features.</p>
			)}
		</div>
	);
};

export default RegisterPage;
