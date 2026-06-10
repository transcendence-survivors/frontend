import SignInForm from '@/features/auth/components/SignInForm';

export default function LoginPage() {
	return (
		<main className='flex flex-col min-h-[90vh] items-center justify-center '>
			<section className='w-full max-w-lg px-4'>
				<SignInForm />
			</section>
		</main>
	);
}
