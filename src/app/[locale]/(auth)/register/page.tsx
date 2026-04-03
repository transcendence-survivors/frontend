'use client';

import useUser from '@/hooks/useUser';

const RegisterPage = () => {
	const { data: user, isLoading, isError } = useUser();

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error loading user data.</div>;
	}

	return (
		<div className='container mx-auto py-10'>
			<h1 className='text-2xl font-bold mb-6'>Register</h1>
			{user ? (
				<div>
					<p>Welcome back, {user.name}!</p>
					<p>Your email: {user.email}</p>
				</div>
			) : (
				<p>Please register to access more features.</p>
			)}
		</div>
	);
};

export default RegisterPage;
