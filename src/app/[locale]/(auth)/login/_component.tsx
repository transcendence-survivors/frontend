'use client';

import { useLogin } from '@/hooks/useLogin';

const Login = () => {
	const mutation = useLogin();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		mutation.mutate({ email, password });
	};

	return (
		<div className='container mx-auto py-10'>
			<h1 className='text-2xl font-bold mb-6'>Login</h1>
			<p>Please log in to access your account.</p>
			<form onSubmit={onSubmit} className='max-w-md mx-auto mt-6'>
				<div className='mb-4'>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700'>
						Email
					</label>
					<input
						type='email'
						name='email'
						id='email'
						required
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
					/>
				</div>
				<div className='mb-6'>
					<label
						htmlFor='password'
						className='block text-sm font-medium text-gray-700'>
						Password
					</label>
					<input
						type='password'
						name='password'
						id='password'
						required
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
					/>
				</div>
				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
					{mutation.isLoading ? 'Logging in...' : 'Login'}
				</button>
				{mutation.isError && (
					<p className='mt-4 text-sm text-red-600'>
						Login failed. Please check your credentials and try again.
					</p>
				)}
			</form>
		</div>
	);
};

export default Login;
