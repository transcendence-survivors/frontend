import { Button } from '@/components/ui/button';
import SignInForm from '@/features/auth/components/SignInForm';
import { I18nLink } from '@/modules/i18n/components/I18nLink';
import { getTranslations } from 'next-intl/server';

export default async function LoginPage() {
	const t = await getTranslations('auth.signin');

	return (
		<main className='flex flex-col min-h-[85vh] items-center justify-center '>
			<section className='w-full max-w-lg px-4 space-y-4'>
				<div>
					<h1>{t('title')}</h1>
					<Button
						variant='link'
						size='sm'
						className='p-0 select-auto h-auto text-sm text-muted-foreground'
						asChild>
						<I18nLink href='register'>{t('no_account')}</I18nLink>
					</Button>
				</div>
				<SignInForm />
			</section>
		</main>
	);
}
