import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { BugReportForm } from './_test';
import MyForm from './_test2';

export default function LoginPage() {
	return (
		<main>
			<Card className='w-full sm:max-w-md mx-auto mt-10'>
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
					<MyForm />
				</CardContent>
			</Card>
		</main>
	);
}
