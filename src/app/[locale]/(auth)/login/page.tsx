import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import SignUpForm from '@/features/auth/components/SignUpForm';

export default function LoginPage() {
	return (
		<>
			<main className='flex min-h-screen items-center justify-center'>
				<Card className='w-full h-fit mt-10 max-w-96'>
					<CardHeader>
						<CardTitle className='text-center'>
							<h1>Sign Up</h1>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<SignUpForm />
					</CardContent>
				</Card>
			</main>
		</>
	);
}
