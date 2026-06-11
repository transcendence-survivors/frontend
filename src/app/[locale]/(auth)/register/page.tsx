import { Button } from '@/components/ui/button';
import SignUpForm from '@/features/auth/components/SignUpForm';
import { I18nLink } from '@/modules/i18n/components/I18nLink';
import { getTranslations } from 'next-intl/server';

export default async function LoginPage() {
	const t = await getTranslations('auth.signup');

	return (
		<main className='flex flex-col min-h-[85vh] items-center justify-center'>
			<section className='w-full max-w-lg px-4 space-y-4'>
				<div>
					<h1>{t('title')}</h1>
					<Button
						variant='link'
						asChild
						className='p-0 select-auto h-auto text-sm text-muted-foreground'>
						<I18nLink href='login'>{t('already_account')}</I18nLink>
					</Button>
				</div>
				<SignUpForm />
			</section>
		</main>
	);
}
