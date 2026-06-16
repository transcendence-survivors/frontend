import AuthPage from '@/components/layouts/AuthPage';
import SignupForm from '@/features/auth/components/SignUpForm';
import { getTranslations } from 'next-intl/server';

export default async function SignUpPage() {
	const t = await getTranslations('auth.signup');

	return (
		<AuthPage title={t('title')} linkText={t('already_account')} linkHref='login'>
			<SignupForm />
		</AuthPage>
	);
}
