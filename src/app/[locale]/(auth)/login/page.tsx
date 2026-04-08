import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { BugReportForm } from './_test';
import MyForm from './_test2';

export default function LoginPage() {
	return (
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
					<MyForm />
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
					<BugReportForm />
				</CardContent>
			</Card>
		</main>
	);
}
