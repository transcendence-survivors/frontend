import AuthPage from '@/components/layouts/AuthPage';
import SignInForm from '@/features/auth/components/SignInForm';
import { getTranslations } from 'next-intl/server';

export default async function LoginPage() {
	const t = await getTranslations('auth.signin');

	return (
		<AuthPage title={t('title')} linkText={t('no_account')} linkHref='register'>
			<SignInForm />
		</AuthPage>
	);
}
