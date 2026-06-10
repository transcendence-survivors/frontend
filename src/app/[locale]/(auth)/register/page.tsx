import { Button } from '@/components/ui/button';
import SignUpForm from '@/features/auth/components/SignUpForm';
import { I18nLink } from '@/modules/i18n/components/I18nLink';

export default function LoginPage() {
	return (
		<main className='flex min-h-[85vh] items-center justify-center'>
			<section className='max-w-lg p-4 w-full'>
				<div className='space-y-1'>
					<h1>Register</h1>
					<p className='text-sm text-muted-foreground '>
						<span>Already have an account?&nbsp;</span>
						<Button variant='link' asChild className='p-0 select-auto h-auto'>
							<I18nLink href='login'>Sign in</I18nLink>
						</Button>
					</p>
				</div>
				<SignUpForm />
			</section>
		</main>
	);
}
