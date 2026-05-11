import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import TestForm from '@auth/components/TestForm';
import TestForm2 from '@auth/components/TestForm2';
import LocaleSwitcher from '@i18n/components/LocaleSwitcher';

export default function LoginPage() {
	return (
		<>
			<nav className='bg-background py-4 px-6 flex items-center justify-end gap-4 sticky top-0 z-1000 height-16'>
				<LocaleSwitcher />
			</nav>
			<main className='flex gap-[5vw] px-[10vw] w-full justify-center'>
				<Card className='w-full h-fit mt-10 max-w-96'>
					<CardHeader>
						<CardTitle>
							<h3>Bug Report</h3>
						</CardTitle>
						<CardDescription>
							Help us improve by reporting bugs you encounter.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<TestForm2 />
					</CardContent>
				</Card>
				<Card className='w-full h-fit mt-10 max-w-96'>
					<CardHeader>
						<CardTitle>
							<h3>Bug Report</h3>
						</CardTitle>
						<CardDescription>
							Help us improve by reporting bugs you encounter.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<TestForm />
					</CardContent>
				</Card>
			</main>
		</>
	);
}
