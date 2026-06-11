import { Button } from '@/components/ui/button';
import SignInForm from '@/features/auth/components/SignInForm';
import { I18nLink } from '@/modules/i18n/components/I18nLink';
import { getTranslations } from 'next-intl/server';

export default async function LoginPage() {
	const t = await getTranslations('auth.signin');
	return (
		<main className='flex flex-col min-h-[90vh] items-center justify-center '>
			<section className='w-full max-w-lg px-4 space-y-4'>
				<div className='mt-2'>
					<h1>{t('title')}</h1>
					<p className='text-sm text-muted-foreground'>
						<span>{t('account_exists')}&nbsp;</span>
						<Button
							variant='link'
							size='sm'
							className='select-auto p-0 h-auto'
							asChild>
							<I18nLink href='register'>{t('sign_up')}</I18nLink>
						</Button>
					</p>
				</div>
				<SignInForm />
			</section>
		</main>
	);
}
